import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    media: {
        media_type: String,
        url:String,
    },
    caption: {
        type: String,
        required:true
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Feed = mongoose.model('Feed', feedSchema);

export default Feed;