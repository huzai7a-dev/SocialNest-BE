"use strict";
// import { Request, Response } from 'express';
// import {db} from "../config";
// const getFeeds = async (req: Request, res: Response) => {
//     try {
//         const result = await db.any('SELECT * FROM feeds');
//         res.status(200).send(result);
//     } catch (error:any) {
//         console.log(error.stack);
//         res.send(500).send('internal error');
//     }
// }
// const addFeed = async (req: Request, res: Response) => {
//     const { title, content } = req.body;
//     try {
//         const result = await db.none('INSERT INTO feeds(title,content) VALUES($1,$2)',[title,content]);
//         res.status(200).send('Feed added successfully');
//     } catch (error: any) {
//         console.log('Error adding feed:', error.stack);
//         res.send(500).send('internal error');
//     }
// }
// export {getFeeds,addFeed}
