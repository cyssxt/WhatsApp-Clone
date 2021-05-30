import {ContactModel} from "../model/ContactModel";
import {UserInfoModel} from "../model/UserInfoModel";

export const updateContacts = async (userId:string,contacts:any)=>{
    let now = new Date()
    let {jid}:any = await UserInfoModel.findOne({userId});
    let contact:any = await ContactModel.findOne({jid});
    if(!contact){
        contact = new ContactModel({jid,createdAt:now,updateAt:now});
    }else{
        contact.updateAt = now;
    }
    let extend = []
    for(let key in contacts){
        extend.push(contacts[key])
    }
    contact.extend = extend
    contact.save();

}

export const getContacts = async (req:any,res:any)=>{
    let {userId} = req.params
    let {jid}:any = await UserInfoModel.findOne({userId});
    return res.status(200).json({
        success: true,
        data: await ContactModel.findOne({jid})
    })
}
