import { Schema, Types, model } from 'mongoose'

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['toDo', 'doing', 'done'],
        default: 'toDo'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: true
    },
    userId: { // create task 
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    assignTo: { // 
        type: Types.ObjectId,
        required: true,
        ref: 'user'

    }
}, {
    timestamps: true
})


export const taskModel = model('task', taskSchema)