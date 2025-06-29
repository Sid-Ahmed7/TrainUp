import express from 'express';
import {config} from 'dotenv';
import pool from './config/db';
config();

const app = express();


export default app;