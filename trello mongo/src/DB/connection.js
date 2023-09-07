
import mongoose from 'mongoose'

export const connectedDB = async () => {
    return await mongoose.connect('mongodb://127.0.0.1:27017/trello').then(() => {
        console.log("connected to DB");
    }).catch(() => {
        console.log("fail to connected to DB");
    })
} 