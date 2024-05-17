import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:Number,
    gender:{
        type:String,
        enum:['Male','Female'],
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    profilePic:{
        type:String,
    }


},{timestamps:true});

const userModel = model('User',UserSchema);

export default userModel