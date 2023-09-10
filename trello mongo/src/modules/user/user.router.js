import { Router } from "express";
import * as userController from './controller/user.controller.js'
import { auth } from "../../middleware/auth.js";
import { validationCoreFunction } from "../../middleware/validation.js";
import { SignInSchema, SignUpSchema } from "./user.validationSchemas.js";
const router = Router()
router.post('/signup',validationCoreFunction(SignUpSchema), userController.signUp)
router.get('/confirmEmail/:token', userController.confirmEmail)

router.post('/logIn',validationCoreFunction(SignInSchema), userController.login)
router.patch('/changePassword', auth, userController.changePassword)
router.put('/update', auth, userController.updateUser)
router.delete('/delete', auth, userController.deleteUser)
router.patch('/softDelete', auth, userController.softDelete)
router.patch('/logout', auth, userController.logout)
export default router