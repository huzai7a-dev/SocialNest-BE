import { Request, Response } from 'express';
import { validateFeed } from '../validations/feedValidation';
import { FeedRequestBody } from '../interfaces/RequestInterfaces';
import { uploadImage } from '../utils';
import Feed from '../models/feed';

interface FeedData {
    user: string;
    caption: string;
    media?: {
        media_type: string;
        url: string;
    };
}

const handleGetFeeds = async (req: Request, res: Response) => {
    try {
        const feeds = await Feed.find().populate('user');

        res.status(200).send(feeds);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const handleGetSingleFeed = async (req:Request,res:Response) => {
    try {
        const id = req.params.id;
        const feed = await Feed.findById(id);
        if (!feed) return res.status(404).send('Feed not found');
        return res.status(200).send(feed);

    } catch (error) {
        return res.status(500).send('Server Error')        
    }
}

const handleCreateFeed = async (req: Request, res: Response) => {
    const { caption, user } = req.body as FeedRequestBody;
    const { error } = validateFeed(req.body as FeedRequestBody);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const feedData: FeedData = {
            user: user.id,
            caption: caption,
        };
        if (req.files) {
            const { resource_type, secure_url } = await uploadImage(req.files);
            feedData.media = {
                media_type: resource_type,
                url: secure_url,
            }
        };
        const feed = new Feed(feedData);
        const savedFeed = await feed.save();
        res.status(201).send(savedFeed);
    } catch (error: any) {
        console.log(error.stack)
        res.status(500).send('Server Error');
    }
}

export { handleGetFeeds, handleCreateFeed,handleGetSingleFeed };