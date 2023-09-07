import Message from '../../models/message.js';


const getMessages = async (chatId) => {
    try {
        const messages = await Message.find({chatId});
        return messages;
    }
    catch (error) {
        console.log(error);
        return null;
    }

}

const addMessage = async (chatId, sender, content,image=null) => {
    console.log("addMessage",image)
    try {
        const message = new Message({chatId, sender, content});
        if (image) {
            message.image = image;
        }
        await message.save();
        return message;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const deleteMessage = async (messageId) => {
    try {
        const message = await Message.findById(messageId);
        await message.delete();
        return message;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const editMessage = async (messageId, content) => {
    try {
        const message = await Message.findById(messageId);
        message.content = content;
        await message.save();
        return message;
    }
    catch (error) {
        console.log(error);
        return null;
    }
} 


export {
    getMessages, 
    addMessage,
    deleteMessage,
    editMessage,
};

export default {
    getMessages,
    addMessage,
    deleteMessage,
    editMessage,
};

