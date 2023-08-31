import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    try {
        let posts;
        let answered = req.query.answered;
        let query = req.query.query;
        let filter = {};
        if(answered === "true") {
            filter["answer"] = {$ne: null};
        }
        else if(answered === "false") {
            filter["answer"] = null;
        }
        if(query) {
            filter["$or"] = [
                {question: {$regex: query, $options: "i"}},
                {answer: {$regex: query, $options: "i"}},
                {topic: {$regex: query, $options: "i"}},
            ]
        }
        posts = await Post.find(filter);
        posts  = posts.sort((a,b) => b.date - a.date);
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

export const answerPost = async (req, res) => {
    const postId = req.params.id;
    const {answer,answerImage} = req.body;
    if(!answer || answer.trim() === "") return res.status(400).json({message: "Answer is required"});
    try {
        const post = await Post.findById(postId);
        post.answer = answer;
        post.answerImage = answerImage;
        await post.save();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


