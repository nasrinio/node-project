import { postModel } from "../../../DB/models/postModel.js";
import { userModel } from "../../../DB/models/userModel.js";

export const addPost = async (req, res) => {
    const { title, content, userID } = req.body;
    try {
        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user);

        const post = await postModel.create({ title, content, userID });
        user.posts.push(post._id)
        await user.save()
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    try {
        //const post = await postModel.findOneAndDelete({ _id: id , userID});
        const post = await postModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (userID != post.userID) {
            return res.status(404).json({ error: 'YOU ARE NOT ALLOWED TO DELETE THIS POST' });
        }
        await postModel.deleteOne({ _id: post._id })

        const user = await userModel.findById(post.userID);
        user.posts.pull(id);
        await user.save();
        return res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    try {
        const post = await postModel.findOne({ _id: id, userID });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.title = req.body.title;
        post.content = req.body.content;
        
        await post.save();
        return res.json({ post });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


export const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('userID');
        return res.json({ posts });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


export const sortPosts = async (req, res) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 }).populate('userID');
        return res.json(posts);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}