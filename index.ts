
import express, { Request, Response, NextFunction } from 'express';
import morgan from "morgan";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

import authRoutes from './routes/authRoutes';
import feedRoutes from './routes/feedRoutes';
const app = express();

// Middleware
app.use(morgan('dev')); // Logging HTTP requests
app.use(bodyParser.json());

// app.use('/feeds', feedRoutes);
app.use('/auth', authRoutes);
app.use('/feeds',feedRoutes)

app.use((err:Error, req:Request, res:Response, next:NextFunction):void => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
