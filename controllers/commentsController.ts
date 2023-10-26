import { Request, Response } from "express"
import Feed from "../models/feed";
import Comment from "../models/comments";

const  handleAddComment  = async(req:Request,res:Response) => {
    const feedId = req.params.id;
    const userId = req.body.user.id;
    const commentText = req.body.text
    try {
        
    const feed = await Feed.findById(feedId);
    if (!feed) return res.status(404).send('Feed not found');

    if (!commentText) return res.status(400).send('Comment is not provided');

    const comment = new Comment({
        user: userId,
        text: commentText,
        feed: feedId
    });
    
    const savedComment = await comment.save();
        
    feed.commentsCount += 1
    await feed.save();
        
    return res.status(201).send(savedComment);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
}

const handleGetComments = async(req:Request,res:Response) => {
    const feedId = req.params.id;
    
    const comments = await Comment.find({ feed: feedId });
    res.status(200).send(comments);
}
export { handleAddComment,handleGetComments }