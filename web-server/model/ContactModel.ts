import mongoose from "mongoose";
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        userId:{type:String,required:true,unique:true},
        createdAt:{type:Date,required:true},
        updateAt:{type:Date,required:false},
        extend:{type:Schema.Types.Mixed,required:false}
    }
);
export const ContactModel = mongoose.model("contact_info", contactSchema);


