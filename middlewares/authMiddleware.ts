import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const authMiddleware = (req:Request,res:Response,next:NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({ message: 'access denide' });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET || '');
        req.body.user = decode
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}

export default authMiddleware