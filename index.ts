
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import morgan from "morgan";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// Load environment variables from .env file
dotenv.config();

import authRoutes from './routes/authRoutes';
import feedRoutes from './routes/feedRoutes';
const app = express();

// Middleware
app.use(morgan('dev')); // Logging HTTP requests
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/feeds', feedRoutes);
app.use('/auth', authRoutes);
app.use('/feeds', feedRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

mongoose.connect(process.env.db_conn_string!)
    .then(() => {
        console.log('connected to db');
    }).catch((err) => {
        console.log(err)
    })

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
