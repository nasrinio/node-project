import { Router } from "express";
import * as user from "./controller/user.js";

const router = Router();
router.get('/', (req, res) => {
    res.json({ message: "user API" })
})




router.post('/signup', user.signUp)

router.post('/signin', user.signIn)

router.patch('/update/:_id', user.updateUser)

router.delete('/delete/:_id', user.deleteUser)

router.get('/age-between/:maxAge/:minAge', user.ageBetween)

router.get('/getAllUsers', user.getAllUsers)

router.get('/get-profile/:id', user.getUserWithNotes)

router.get('/searchUser', user.searchUser)





export default router