import { Request,Response } from 'express'
import Feed from "../models/feed";

const handleLikeFeed = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.body.user.id
   
    try {
        const feed = await Feed.findById(id);
        if (!feed) return res.status(404).send('Feed not found');

        if (feed.likes.includes(userId)) {
            return res.status(400).json({ message: 'Post already liked' });
        }
        feed.likes.push(userId);
        feed.likesCount += 1;

        await feed.save();
        return res.status(200).json({ message: 'Post liked' });
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error')
    }
}

export {handleLikeFeed}