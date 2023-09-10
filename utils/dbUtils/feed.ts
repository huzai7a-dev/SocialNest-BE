import { RowDataPacket } from "mysql2";

import { db } from "../../config";
import { FeedRequestBody } from "../../interfaces/RequestInterfaces";

export const createFeed = async({caption,user}: FeedRequestBody) => {
    const query = 'INSERT INTO posts (caption, profile_id) VALUES (?,?)';
    const values = [caption, user.id]
    try {
        const [rows] = await db.promise().query(query, values);
        return rows as RowDataPacket;
    } catch (error) {
        throw error
    }
}