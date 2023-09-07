import mongoose from "mongoose";



export const connection = async () => {
    return await mongoose
    .connect('mongodb://127.0.0.1:27017/projtwo')
    .then((res) => {
        console.log("DB connected");
    }).catch(err => {
        console.log({ message: "failed to connect DB", err });
    })
}  

/*export const connectionDB = async () => {
    return await mongoose
    .connect('mongodb://127.0.0.1:27017/c40Sunday')
    .then((res) => console.log('Db connection success'))
    .catch((err) => console.log('DB connection Fail', err))
}*/
