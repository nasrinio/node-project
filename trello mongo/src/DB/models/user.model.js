import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
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
    age: Number,
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        default: 'female'
    },  
    isDeleted: {// soft delete
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isConfirmed: {
        type: Boolean,
        default: false,
      },
}, {
    timestamps: true
})


export const userModel = model('user', userSchema)