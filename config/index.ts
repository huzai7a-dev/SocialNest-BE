
import mysql, { PoolOptions } from 'mysql2';
import { v2 as cloudinary } from 'cloudinary';


const access: PoolOptions = {
    user: 'huzaifa',
    password: 'abc123',
    database: 'social',
    port: 3306
};

const db = mysql.createPool(access);

cloudinary.config({
    cloud_name: 'drwg6wons',
    api_key: '979426751757924',
    api_secret: process.env.CLOUD_API_SECRET
});

export { db, cloudinary as cloud };
