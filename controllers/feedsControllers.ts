import { Request, Response, response } from 'express';

import { validateFeed } from '../utils/validations/feedValidation';
import { createFeed } from '../utils/dbUtils/feed';
import { FeedRequestBody } from '../interfaces/RequestInterfaces';

const handleGetFeeds = (req: Request, res: Response) => {
    console.log(req.body.user);
    res.status(200).send(`Feeds for id ${req.body.user.id}`);
}

const handleCreateFeed = async(req:Request,res:Response) => {
    const { error } = validateFeed(req.body as FeedRequestBody);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        await createFeed(req.body);
        res.status(201).send('created');
    } catch (error:any) {
        console.log(error.stack)
        res.status(500).send('Server Error');
    }
}

export {handleGetFeeds,handleCreateFeed};