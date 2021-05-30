import {createWAConnection, getQrCode} from "./UserInfoController";
import {MessageType, Mimetype, Presence} from "../Baileys";
export const SocketMap:any = {}
export const ConnectionMap:any={}
export const createSocket = (http:any)=> {
    const io = require("socket.io")(http)
    io.on("connection", async (socket: any) => {
        let {userId} = socket.handshake.query;
        SocketMap[userId] = socket;
        console.log(`${userId}-${socket}`)

        if(!SocketMap[userId]) {
            let connect = await createWAConnection(userId,SocketMap);
            console.log('-------')
            console.log(connect);
            ConnectionMap[userId] = connect;
        }
        socket.on("GET_QRCODE", async () => {
            socket.emit("QR_CODE", await getQrCode(userId))
        });

        socket.on("TYPEING", async () => {
            ConnectionMap[userId].updatePresence(Presence.composing)
        });

        socket.on("PAUSE", async () => {
            ConnectionMap[userId].updatePresence(Presence.available)
        });

        socket.on("SEND_TEXT",async ({jid,text}:{jid:string,text:string})=>{
            ConnectionMap[userId].sendMessage(jid,text,MessageType.text);
        })

        socket.on("SEND_VOICE",({jid, url}:{jid:string,url:string})=>{
            ConnectionMap[userId].sendMessage(jid, {url},MessageType.audio,{ptt:true,mimetype:Mimetype.ogg});
        })

        socket.on("SEND_IMAGE",(msg:any)=>{

        })

        // socket.on(EventConstant.GET_USER_INFO,async ()=>{
        //     socket.emit(EventConstant.GET_USER_INFO,await getUserInfo(userId))
        // })

        socket.on("LOGIN", (msg: any) => {

        });

        socket.on("PING", (msg: any) => {
        });

        socket.on("CHAT_LIST", (msg: any) => {
            // console.log("CHAT_LIST == ", msg);

            // Save User unread count to Chat List table
            // saveUserUnreadCount(msg);

            socket.emit("CHAT_LIST", msg);
        });

        socket.on("CHAT_ROOM", (msg: any) => {
            // console.log("CHAT_ROOM == ", msg);
            socket.emit("CHAT_ROOM", msg);
            // socket.emit("CHAT_LIST", msg);
        });

        socket.on("SCAN_QR_CODE", (msg: any) => {
            console.log("SCAN_QR_CODE == ", msg);
            socket.emit("SCAN_QR_CODE", msg);
        });

        socket.on("LAST_SEEN", (msg: any) => {
            // console.log("LAST_SEEN == ", msg);

            // Save User Last seen to Chat Room table
            socket.emit("LAST_SEEN", msg);
        });

        socket.on("USER_STATUS", (msg: any) => {
            console.log("USER_STATUS == ", msg);
            socket.emit("USER_STATUS", msg);
        });
    });

}
