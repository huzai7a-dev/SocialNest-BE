import { RowDataPacket } from "mysql2";

import { db } from "../../config";
import { SignupRequestBody } from "../../interfaces/RequestInterfaces";

export const createUser = async({email,full_name,password,profile_image_url}:SignupRequestBody) => {
    const query = 'INSERT INTO users (email, full_name, password, profile_image_url) VALUES (?, ?, ?, ?)';
    const values = [email, full_name, password, profile_image_url];
    const [rows] = await db.promise().query(query, values);
    return rows as RowDataPacket[] || null;
}

export const searchUserByEmail = async(email: string) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [result] = await db.promise().query(query, [email]);
    const row = result as RowDataPacket[];
    return row[0] || null
}