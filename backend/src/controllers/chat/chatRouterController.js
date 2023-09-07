import chatController from "./chatController.js";
import messageController from "../message/messageController.js";

const createChat = async (req, res) => {
    try {
        const { name, users } = req.body;
        const chat = await chatController.createChat(name, users.split(','));
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getChat = async (req, res) => {
    try {
        const chat = await chatController.getChat(req.params.id);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getChats = async (req, res) => {
    try {
        const chats = await chatController.getChats(req.query.user);
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const rename = async (req, res) => {
    try {
        const chat = await chatController.rename(req.params.id, req.body.name);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const setPrivacy = async (req, res) => {
    try {
        const chat = await chatController.setPrivacy(req.params.id, req.body.privacy);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const addUser = async (req, res) => {
    try {
        const chat = await chatController.addUser(req.params.id, req.body.username);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const removeUser = async (req, res) => {
    try {
        const chat = await chatController.removeUser(req.params.id, req.body.username);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addMessage = async (req, res) => {
    try {
        console.log("file",req.file);
        const image = req.file ? 'uploads/'+req.file.filename : null;
        const chat = await messageController.addMessage(req.params.id,  req.user.username,req.body.content, image);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteChat = async (req, res) => {
    try {
        const chat = await chatController.deleteChat(req.params.id);
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getVisibleChats = async (req, res) => {
    try {
        const viewer = req.body.viewer;
        const username = req.params.username;
        const chats = await chatController.getVisibleChats(username, viewer);
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export {
    createChat,
    getChat,
    getChats,
    rename,
    setPrivacy, 
    addUser,
    removeUser,
    addMessage,
    deleteChat,
    getVisibleChats,
};

export default {
    createChat,
    getChat,
    getChats,
    rename,
    setPrivacy, 
    addUser,
    removeUser,
    addMessage,
    deleteChat,
    getVisibleChats,
};




