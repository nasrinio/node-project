import { Router } from "express"
import * as uc from "./contoller/user.js"

const router = Router()
router.get('/signUp', uc.signUp) 
router.get('/login', uc.login) 
router.get('/deleteUser/:id', uc.deleteUser)
router.get('/updateUser', uc.updateUser) 
router.get('/searchUser', uc.searchUser)
router.get('/searchUserBy', uc.searchUserById)








export default router