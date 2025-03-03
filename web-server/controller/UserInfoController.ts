import fs from "fs";
import {WAConnection,ReconnectMode,waChatKey} from '../Baileys/lib';
import {UserInfoModel} from "../model/UserInfoModel";
import EventConstant from "../whatsapp-constant/EventConstant";
import {updateChat} from "./ChatController";
import {updateContacts} from "./ContactController";
import {
    MessageType,
    WA_MESSAGE_STUB_TYPES,
    WALocationMessage
} from "../Baileys/src";
import {getMsg, saveMsg} from "./UserMsgController";
import {SocketMap} from "./SocketConnections";
import config from "config";
let ConnectionMap:any = {};

export const getUserInfo = async (req:any,res:any)=>{
    let {userId} = req.params
    return res.status(200).json({data:await UserInfoModel.findOne({userId})})
}

export const logout = async(req:any,res:any)=>{
    let {userId} = req.params
    if(ConnectionMap[userId]) {
        await ConnectionMap[userId].connection.logout()
        await ConnectionMap[userId].connection.close();
        delete ConnectionMap[userId]
    }
    if(SocketMap[userId]) {
        SocketMap[userId].disconnect()
        delete SocketMap[userId]
    }

    let authPath = `auth/${userId}.json`
    if(fs.existsSync(authPath)){
        fs.unlinkSync(authPath);
    }
    return res.status(200).json({})
}
export const getQrCode = async (userId:string)=>{
    let user = await UserInfoModel.findOne({userId});
    // @ts-ignore
    return user?.qrCode;
}
export const saveQrCode = async (userId:string,qrCode:string)=>{
    await UserInfoModel.updateOne({userId},{qrCode});
}
export const onLoginSuccess = async (userId:string,jid:string,extend:any)=>{
    return UserInfoModel.updateOne({userId}, {jid, extend, loginAt: new Date(), loginFlag: true});
}
export const parseMessage = async (userId:string,m:any,conn:WAConnection)=>{
    const messageContent = m.message
    console.log(m);
    let sender = m.key.remoteJid
    if (m.key.participant) {
        // participant exists if the message is in a group
        sender += ' (' + m.key.participant + ')'
    }
    const messageType = Object.keys (messageContent)[0] // message will always contain one key signifying what kind of message
    let content:any = null;
    let quotedMsgId = null;
    if (messageType === MessageType.text) {
        const text = m.message.conversation
        content = text;
        console.log(sender + ' sent: ' + text)
    } else if (messageType === MessageType.extendedText) {
        const {text,contextInfo} = m.message.extendedTextMessage
        quotedMsgId = contextInfo?.stanzaId;
        content = text
        console.log(sender + ' sent: ' + text + ' and quoted message: ' + JSON.stringify(m.message)+`---${quotedMsgId}`)
    } else if (messageType === MessageType.contact) {
        const contact = m.message.contactMessage
        content = contact;
        console.log(sender + ' sent contact (' + contact.displayName + '): ' + contact.vcard)
    } else if (messageType === MessageType.location || messageType === MessageType.liveLocation) {
        const locMessage = m.message[messageType] as WALocationMessage
        console.log(`${sender} sent location (lat: ${locMessage.degreesLatitude}, long: ${locMessage.degreesLongitude})`)
        content = locMessage;
        let mediaPath = config.get('mediaPath');
        let fullPath = `${mediaPath}/media_loc_thumb_in_${m.key.id}`;
        let data = await conn.downloadAndSaveMediaMessage(m, fullPath,true) // save location thumbnail
        let index = data.lastIndexOf("/")
        content = data.substring(index+1);
        if (messageType === MessageType.liveLocation) {
            console.log(`${sender} sent live location for duration: ${m.duration/60}`)
        }
    } else {
        // if it is a media (audio, image, video, sticker) message
        // decode, decrypt & save the media.
        // The extension to the is applied automatically based on the media type
        let mediaPath = config.get('mediaPath');
        let fileName = `${mediaPath}/media_loc_thumb_in_${m.key.id}`;
        try {
            const savedFile = await conn.downloadAndSaveMediaMessage(m, fileName,true)
            let index = savedFile.lastIndexOf("/")
            content = savedFile.substring(index+1);
            console.log(sender + ' sent media, saved at: ' + savedFile)
        } catch (err) {
            console.log('error in decoding message: ' + err)
        }
    }
    let msg = await saveMsg(userId,content,sender,messageType,m.key.id,quotedMsgId,m.key.fromMe,m.message.ptt,m.messageTimestamp);
    SocketMap[userId].emit("NEW-MSG",msg);
    if(quotedMsgId) {
        let parent = await getMsg(quotedMsgId);
        let {jid}:any = await UserInfoModel.findOne({userId});
        if(!parent){
            let contextInfo = m.message.extendedTextMessage.contextInfo;
            await parseMessage(userId, {...contextInfo,message:contextInfo.quotedMessage
            ,key:{
                id: quotedMsgId,
                fromMe: jid==contextInfo.participant,
                remoteJid: jid==contextInfo.participant?jid:sender
                }},conn);
        }
    }
}
export const createWAConnection = async (userId:string,SocketMap:any)=>{
    const conn = new WAConnection() // instantiate
    ConnectionMap[userId] = {connection:conn,createAt:new Date(),loginFlag:false,loginDate:null};
    conn.autoReconnect = ReconnectMode.onConnectionLost // only automatically reconnect when the connection breaks
    conn.logger.level = 'debug' // set to 'debug' to see what kind of stuff you can implement
    // attempt to reconnect at most 10 times in a row
    conn.connectOptions.maxRetries = 10
    conn.chatOrderingKey = waChatKey(true) // order chats such that pinned chats are on top
    conn.on('chats-received', async ({ hasNewChats }:{hasNewChats:any}) => {
        await updateChat(userId,JSON.parse(JSON.stringify(conn.chats)))
        SocketMap[userId].emit(EventConstant.CHAT_LIST,conn.chats)
        ConnectionMap[userId] = {...ConnectionMap[userId],loginFlag:true,loginDate:new Date()}
    })
    conn.on('contacts-received', async() => {
        await updateContacts(userId,JSON.parse(JSON.stringify(conn.contacts)))
        SocketMap[userId].emit(EventConstant.CONTACTS_LIST,conn.contacts);
    })
    conn.on("login-success",async(user:any)=>{
        let result = await onLoginSuccess(userId,user.jid,user);
        SocketMap[userId].emit(EventConstant.LOGIN_SUCCESS,result);
    })
    conn.on('qr', async (qr:any) => {
        await saveQrCode(userId,qr);
        SocketMap[userId].emit("QR_CODE",qr)
    })
    conn.on('initial-data-received', (data) => {
        console.log('received all initial messages')
        console.log(data)
    })
    if(!fs.existsSync("auth")){
        fs.mkdirSync("auth")
    }
    let tokenFile = `auth/${userId}.json`
    // loads the auth file credentials if present
    /*  Note: one can take this auth_info.json file and login again from any computer without having to scan the QR code,
        and get full access to one's WhatsApp. Despite the convenience, be careful with this file */
    fs.existsSync(tokenFile) && conn.loadAuthInfo (tokenFile)
    // uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
    //conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
    await conn.connect()
    // credentials are updated on every connect
    const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
    fs.writeFileSync(tokenFile, JSON.stringify(authInfo, null, '\t')) // save this info to a file
    conn.on('chat-update', async (chat:any) => {
        if (chat.presences) { // receive presence updates -- composing, available, etc.
            Object.values(chat.presences).forEach((presence:any) => console.log( `${presence.name}'s presence is ${presence.lastKnownPresence} in ${chat.jid}`))
        }
        if(chat.imgUrl) {
            console.log('imgUrl of chat changed ', chat.imgUrl)
            return
        }
        // only do something when a new message is received
        if (!chat.hasNewMessage) {
            if(chat.messages) {
                console.log('updated message: ', chat.messages.first)
            }
            return
        }

        const m = chat.messages.all()[0] // pull the new message from the update
        console.log(m);
        const messageStubType = WA_MESSAGE_STUB_TYPES[m.messageStubType] ||  'MESSAGE'
        console.log('got notification of type: ' + messageStubType)

        const messageContent = m.message
        // if it is not a regular text or media message
        if (!messageContent) return

        await parseMessage(userId,m,conn)

        // send a reply after 3 seconds
        // setTimeout(async () => {
        //     await conn.chatRead(m.key.remoteJid) // mark chat read
        //     await conn.updatePresence(m.key.remoteJid, Presence.available) // tell them we're available
        //     await conn.updatePresence(m.key.remoteJid, Presence.composing) // tell them we're composing
        //
        //     const options: MessageOptions = { quoted: m }
        //     let content
        //     let type: MessageType
        //     const rand = Math.random()
        //     if (rand > 0.66) { // choose at random
        //         content = 'hello!' // send a "hello!" & quote the message recieved
        //         type = MessageType.text
        //     } else if (rand > 0.33) { // choose at random
        //         content = { degreesLatitude: 32.123123, degreesLongitude: 12.12123123 }
        //         type = MessageType.location
        //     } else {
        //         content = fs.readFileSync('./Media/ma_gif.mp4') // load the gif
        //         options.mimetype = Mimetype.gif
        //         type = MessageType.video
        //     }
        //     const response = await conn.sendMessage(m.key.remoteJid, content, type, options)
        //     console.log("sent message with ID '" + response.key.id + "' successfully")
        // }, 3 * 1000)
    })
    return conn;
}
