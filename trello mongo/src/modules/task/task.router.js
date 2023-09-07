import { Router } from "express";
import * as taskController from './controller/task.controller.js'
import { auth } from '../../middleware/auth.js'
const router = Router()
router.post('/addTask', auth, taskController.addTask)
router.put('/updateTask/:taskId', auth, taskController.updateTask)
router.delete('/deleteTask/:taskId', auth, taskController.deleteTask)
router.get('/getAllTasks', taskController.getAllTasks)
router.get('/getAllCreatedTasks', auth, taskController.myCreatedTasks)
router.get('/getAllAssignTasks', auth, taskController.myTasksAssignToMe)
router.get('/getTasksAssignToAnyUser/:id', auth, taskController.getTasksAssignToAnyUser)
router.get('/allLateTasks', auth, taskController.allLateTasks)
export default router