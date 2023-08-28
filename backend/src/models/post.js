import connection from '../db/mongoose.js';


const PostSchema = new connection.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: false,
    },
    imageLink: {
        type: String,
        required: false,
    },
    topic: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Post = connection.model('Post', PostSchema);

export default Post;