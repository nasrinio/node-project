import mongoose from "mongoose";
const postSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content  :{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})


export const postModel = mongoose.model('post',postSchema)