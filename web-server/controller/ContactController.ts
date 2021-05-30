import {ContactModel} from "../model/ContactModel";

export const updateContacts = async (userId:string,contacts:any)=>{
    let now = new Date()
    let contact:any = await ContactModel.findOne({userId});
    if(!contact){
        contact = new ContactModel({userId,createdAt:now,updateAt:now});
    }else{
        contact.updateAt = now;
    }
    contact.extend = contacts
    contact.save();

}

export const getContacts = async (req:any,res:any)=>{
    let {userId} = req.params
    return res.status(200).json({
        success: true,
        data: await ContactModel.findOne({userId})
    })
}
