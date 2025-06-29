import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import AppDataSource from './config/db';
config();

const app = express();
const corsOptions = {

    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json());
app.use(cors(corsOptions))
app.use('/api/auth', authRoutes)


export default app;
export {AppDataSource}