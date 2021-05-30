import mongoose from "mongoose";
let ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userId: { type: String, required: true,unique:true },
        qrCode: { type: String, required: false },
        createdAt: { type:Date, required:true},
        loginAt: { type:Date, required:false},
        loginFlag: {type:Boolean,required:false},
        jid: {type:String,required:false},
        extend:{type:Schema.Types.Mixed,required:false}
    }
);
export const UserInfoModel = mongoose.model("user_info", userSchema);
