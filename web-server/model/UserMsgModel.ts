import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userId: { type: String, required: true },
        msgId:{type:String,required:true},
        content: { type: Schema.Types.Mixed, required: false },
        createdAt: { type:Date, required:true},
        messageType: {type:String,required:true},
        messageTimestamp: {type:Number,required:false},
        jid: {type:String,required:true},
        quotedMsgId: {type:String,required:false},
        extend:{type:Schema.Types.Mixed,required:false},
        fromMe:{type:Boolean,required:true},
        ptt:{type:Boolean,required:false}
    }
);
export const UserMsgModel = mongoose.model("user_msg", userSchema);
