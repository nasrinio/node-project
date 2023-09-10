
import mongoose from 'mongoose'

export const connectedDB = async () => {
    return await mongoose.connect(process.env.CONNECTION_DB_URL).then(() => {
        console.log("DB connection success");
    }).catch(() => {
        console.log("DB connection Fail");
    })
} 