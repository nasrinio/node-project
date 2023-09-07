import { Router } from "express";
import * as userController from './controller/user.controller.js'
import { auth } from "../../middleware/auth.js";
const router = Router()
router.post('/signup', userController.signUp)
router.post('/logIn', userController.login)
router.patch('/changePassword', auth, userController.changePassword)
router.put('/update', auth, userController.updateUser)
router.delete('/delete', auth, userController.deleteUser)
router.patch('/softDelete', auth, userController.softDelete)
router.patch('/logout', auth, userController.logout)
export default router