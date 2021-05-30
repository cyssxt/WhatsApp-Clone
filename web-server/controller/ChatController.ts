import {ChatModel} from "../model/ChatModel";
import {UserInfoModel} from "../model/UserInfoModel";
export const updateChat = async (userId:string,chats:any)=>{
    let now = new Date()
    let {jid}:any = await UserInfoModel.findOne({userId});
    let chat:any = await ChatModel.findOne({jid});
    if(!chat){
        chat = new ChatModel({jid,createdAt:now,updateAt:now});
    }else{
        chat.updateAt = now;
    }
    chat.extend = chats
    chat.save();

}

export const getChats = async (req:any,res:any)=>{
    let {userId} = req.params
    let {jid}:any = await UserInfoModel.findOne({userId});
    return res.status(200).json({
        success: true,
        data: await ChatModel.findOne({jid})
    })
}
