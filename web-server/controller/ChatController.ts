import {ChatModel} from "../model/ChatModel";

export const updateChat = async (userId:string,chats:any)=>{
    let now = new Date()
    let chat:any = await ChatModel.findOne({userId});
    if(!chat){
        chat = new ChatModel({userId,createdAt:now,updateAt:now});
    }else{
        chat.updateAt = now;
    }
    chat.extend = chats
    chat.save();

}

export const getChats = async (req:any,res:any)=>{
    let {userId} = req.params
    return res.status(200).json({
        success: true,
        data: await ChatModel.findOne({userId})
    })
}
