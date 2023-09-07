import connection from '../db/mongoose.js';

const MessageSchema = new connection.Schema({
    chatId: {
        type: String,
        required: true,
        index: true,
    },
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: String,
        required: true,
        default: Date.now(),
    },
});

const Message = connection.model('Message', MessageSchema);

export default Message;
