import { model, Schema, Types } from "mongoose";


const commentSchema = new Schema({
    text:{
        type: String,
        required: true,
    },
    image:{
        type:Object,
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    postId:{
        type:Types.ObjectId,
        ref:'Post',
        required:true,
    },
    
},{timestamps:true})


const commentModel = model('Comment',commentSchema);

export default commentModel