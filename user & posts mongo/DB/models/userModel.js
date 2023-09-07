import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gander: {
        type: String,
        required: true,
        default: 'male',
        enum: ['male', 'female']
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'post',
    }],
}, {
    timestamps: true
})


export const userModel = mongoose.model('User', userSchema)