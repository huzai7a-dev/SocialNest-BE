import { Request, Response, response } from 'express';

const handleGetFeeds = (req: Request, res: Response) => {
    console.log(req.body.user);
    res.status(200).send(`Feeds for id ${req.body.user.id}`);
}

export {handleGetFeeds};