import connection from '../db/mongoose.js';

const UserSchema = new connection.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password :{
        type: String,
        required: true,
    }
});

const User = connection.model('User', UserSchema);

export default User;