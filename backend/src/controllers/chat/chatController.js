/*
* ChatController is a class that handles all the chat related functionality
*/


import { get } from 'mongoose';
import Chat from '../../models/chat.js';
import { getUser } from '../user/userController.js';

const getChats = async (username) => {
    try {
        const chats = await Chat.find({ users: username });
        return chats;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
const getVisibleChats = async (username, viewerName) => {
    try {
        const user = getUser(username);
        if (!user) return null;
        if (viewerName === username) return getChats(username);

        const chats = await Chat.find({ users: username }, {
            $or: [
                { privacy: 'public' },
                {
                    $and: [
                        { privacy: 'private' },
                        { users: viewerName },
                    ]
                },
                {
                    privacy: 'family'
                }
            ]
        });

        if (!user.family.includes(viewerName)) {
            chats = chats.filter(chat => chat.privacy !== 'family');
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}



const getChat = async (chatId) => {
    try {
        const chat = await Chat.findById(chatId);
        return chat;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const createChat = async (name,users) => {
    try {
        const chat = new Chat({ name, users });
        await chat.save();
        return chat;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const rename = async (chatId, name) => {
    try {
        const chat = await Chat.findById(chatId);
        chat.name = name;
        await chat.save();
        return chat;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const setPrivacy = async (chatId, privacy) => {
    try {
        if (!['private', 'family', 'public'].includes(privacy)) return null;
        const chat = await Chat.findById(chatId);
        chat.privacy = privacy;
        await chat.save();
        return chat;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const addUser = async (chatId, username) => {
    try {
        const user = await getUser(username);
        if (!user) return null;
        const chat = await Chat.findById(chatId);
        chat.users.push(username);
        await chat.save();
        return chat;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const removeUser = async (chatId, username) => {
    try {
        const chat = await Chat.findById(chatId);
        chat.users = chat.users.filter(user => user !== username);
        await chat.save();
        return chat;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const deleteChat = async (chatId) => {
    try {
        const chat = await Chat.findById(chatId);
        await chat.delete();
        return chat;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export {
    getChats,
    getVisibleChats,
    getChat,
    createChat,
    rename,
    setPrivacy,
    addUser,
    removeUser,
    deleteChat,
};
export default {
    getChats,
    getVisibleChats,
    getChat,
    createChat,
    rename,
    setPrivacy,
    addUser,
    removeUser,
    deleteChat,
}