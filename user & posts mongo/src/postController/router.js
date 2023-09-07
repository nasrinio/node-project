import { Router } from "express";
import * as post from "./controller/post.js";

const router = Router();
router.get('/', (req, res) => {
    res.json({ message: "post API" })
})




router.post('/add-post', post.addPost);
router.delete('/delete-post/:id', post.deletePost);
router.patch('/update-post/:id', post.updatePost);

router.get('/posts', post.getAllPosts);



router.get('/posts/sorted', post.sortPosts);
export default router