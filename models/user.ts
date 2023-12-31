import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image: String,
    bio: String,
    city: String,
    country: String,
    isVerified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);

export default User;