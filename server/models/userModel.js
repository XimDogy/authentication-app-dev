import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    password: String,
});

const UserModel = mongoose.model('user', userSchema);
export default UserModel;