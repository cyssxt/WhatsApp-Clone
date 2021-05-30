import {UserMsgModel} from "../model/UserMsgModel";

export const saveMsg = async (userId:string,content:any,jid:string,messageType:string,msgId:string,quotedMsgId:string,fromMe:boolean,ptt:boolean,messageTimestamp:number=0)=>{
    let userMsg:any = new UserMsgModel({userId,jid,createdAt:new Date(),content,messageType,msgId,quotedMsgId,fromMe,ptt,messageTimestamp});
    let res =  await userMsg.save();
    console.log(res);
    return res;
}

export const getMsg = async (msgId:string)=>{
    return UserMsgModel.findOne({msgId});
}

export const getChats = async (req:any,res:any)=>{
}

export const getRecentMsg = async(req:any,res:any)=>{
    let {userId,remoteJid} = req.params
    let list = await UserMsgModel.find({userId,jid:remoteJid}).sort({createdAt:1})
    return res.status(200).json({data:list});
}
