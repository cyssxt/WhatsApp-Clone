import {UserMsgModel} from "../model/UserMsgModel";
import {UserInfoModel} from "../model/UserInfoModel";

export const saveMsg = async (userId:string,content:any,jid:string,messageType:string,msgId:string,quotedMsgId:string,fromMe:boolean,ptt:boolean,messageTimestamp:number=0)=>{
    let {jid:senderId}:any = await UserInfoModel.findOne({userId});
    let userMsg:any = new UserMsgModel({senderId,jid,createdAt:new Date(),content,messageType,msgId,quotedMsgId,fromMe,ptt,messageTimestamp});
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
    let {jid:senderId}:any = await UserInfoModel.findOne({userId});
    let list = await UserMsgModel.find({senderId,jid:remoteJid}).sort({createdAt:1})
    return res.status(200).json({data:list});
}
