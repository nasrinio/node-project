import { connectedDB } from "./DB/connection.js"
import userRouter from './modules/user/user.router.js'
import taskRouter from './modules/task/task.router.js'

export const bootstrap = (app, express) => {
    app.use(express.json())
    app.use('/user',userRouter)
    app.use('/task',taskRouter)
    app.use('*', (req, res) => res.json({ message: "not found routing" }))
    connectedDB()
}