import { connection } from '../DB/connection.js';
import userRouter from './userControler/router.js'
import postRouter from './postController/router.js'


export const bootstrap = (app,express)=>{
    app.use(express.json());
    connection()
    app.use('/users',userRouter)
    app.use('/posts',postRouter)
}