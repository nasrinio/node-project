import { taskModel } from '../../../DB/models/task.model.js'
import { userModel } from '../../../DB/models/user.model.js'

export const addTask = async (req, res, next) => {
    try {

        // userId
        // assignTo 
        req.body.userId = req.user.id
        const assignTo = await userModel.findById(req.body.assignTo)
        if (!assignTo) {
            return res.json({ message: "This user You want to assign this task not exist 😒🤔" })
        }
    
        let date = new Date(req.body.deadline)
        let current = new Date()
        if (current > date) {
            return res.json({ message: "Enter valid date" })
        }
        req.body.deadline = date

        const task = await taskModel.create(req.body)
        return res.json({ message: "Done", task })
    } catch (error) {
        return res.json({ message: "catch error", error })
    }
}


export const updateTask = async (req, res, next) => {
    try {
        const { taskId } = req.params
        const task = await taskModel.findById(taskId)
        console.log(task);
        if (!task) {
            return res.json({ message: "Task not found" })
        }
        if (task.userId.toString() != req.user._id) {
            return res.json({ message: "You are not allowed to update This task" })
        }
        const assignTo = await userModel.findById(req.body.assignTo)
        if (!assignTo) {
            return res.json({ message: "This user You want to assign this task not exist 😒🤔" })
        }
        let date = new Date(req.body.deadline)
        let current = new Date()
        if (current > date) {
            return res.json({ message: "Enter valid date" })
        }
        req.body.deadline = date
        await taskModel.updateOne({ _id: taskId }, req.body)
        return res.json({ message: "Done" })
    } catch (error) {
        return res.json({ message: "catch error", error })
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params

        const task = await taskModel.findById(taskId)
        if (!task) {
            return res.json({ message: "Task not found" })
        }

        if (task.userId.toString() != req.user._id) {
            return res.json({ message: "You are not allowed to update This task" })
        }
        await taskModel.deleteOne({ _id: task._id })
        return res.json({ message: "Done" })
    } catch (error) {
        return res.json({ message: "catch error", error })
    }
}



export const getAllTasks = async (req, res, next) => {
    try {

        const tasks = await taskModel.find({}).populate([
            {
                path: 'userId',
                select: 'userName email Phone'
            },
            {
                path: 'assignTo',
                select: 'userName email Phone'
            }
        ])
        return res.json({ message: "Done", tasks })
    } catch (error) {
        return res.json({ message: "catch error", error })
    }
}

export const myCreatedTasks = async (req, res, next) => {
    try {
        const { id } = req.user
        const tasks = await taskModel.find({ userId: id }).populate([
            {
                path: 'userId',
                select: 'userName email Phone'
            },
            {
                path: 'assignTo',
                select: 'userName email Phone'
            }
        ])
        return res.json({ message: "Done", tasks })
    } catch (error) {
        return res.json({ message: "catch error", error })
    }
}


export const myTasksAssignToMe = async (req, res, next) => {
    try {
        const { id } = req.user
        const tasks = await taskModel.find({ assignTo: id }).populate([
            {
                path: 'userId',
                select: 'userName email Phone'
            },
            {
                path: 'assignTo',
                select: 'userName email Phone'
            }
        ])
        return res.json({ message: "Done", tasks })
    } catch (error) {
        return res.json({ message: "catch error", error })
    }
}

export const getTasksAssignToAnyUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const tasks = await taskModel.find({ assignTo: id }).populate([
            {
                path: 'userId',
                select: 'userName email Phone'
            },
            {
                path: 'assignTo',
                select: 'userName email Phone'
            }
        ])
        return res.json({ message: "Done", tasks })
    } catch (error) {
        return res.json({ message: "catch error", error })
    }
}

export const allLateTasks = async (req, res, next) => {
    try {
        const { id } = req.user
        let currentDate = new Date()


        console.log(currentDate);
        const tasks = await taskModel.find({ assignTo: id, deadline: { $lt: currentDate } }).populate([
            {
                path: 'userId',
                select: 'userName email Phone'
            },
            {
                path: 'assignTo',
                select: 'userName email Phone'
            }
        ])
        return res.json({ message: "Done", tasks })
    } catch (error) {
        return res.json({ message: "catch error", error })
    }
}



