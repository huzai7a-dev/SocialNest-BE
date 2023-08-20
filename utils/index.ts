import { cloud } from "../config"
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const uploadImage = async (imageFile: any) => {
    try {
        const result = await cloud.uploader.upload(imageFile[0].path, {
            folder:'uploads'
        });
        return result.secure_url
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error        
    }
}

export const encryptPassword = async(password:string):Promise<string> => {
    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePpassword = async (password:string,hashedPassword:string) => {
    return await bycrypt.compare(password, hashedPassword);
}

export const getToken = (user: {id:string,email:string}) => {
    return jwt.sign(user, process.env.JWT_SECRET || '123');
}