import connection from '../db/mongoose.js';

const ChatSchema = new connection.Schema({
    name: {
        type: String,
        required: true,
    },
    users: {
        type: Array,
        required: true,
    },
    privacy: {
        type: String,
        default: 'private',
    },
});

const Chat = connection.model('Chat', ChatSchema);

export default Chat;