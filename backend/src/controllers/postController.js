import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const replyPost = async (req, res) => {
    const postId = req.params.id;
    const {answer,imageLink} = req.body;
    if(!answer || answer.trim() === "") return res.status(400).json({message: "Answer is required"});
    try {
        const post = await Post.findById(postId);
        post.answer = answer;
        post.imageLink = imageLink;
        await post.save();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


