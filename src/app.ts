import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import * as routes from './routes/index';
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
app.use('/api/auth', routes.authRoutes)
app.use('/api/categorie', routes.categoryRoutes)
app.use('/api/target', routes.targetRoutes)

export default app;
export {AppDataSource}