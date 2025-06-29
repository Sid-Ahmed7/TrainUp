import express from 'express'
import {register, login } from "../controllers/authController"
import { verifyToken } from '../middlewares/authMiddleware';


const router = express.Router();

router.post("/register", register)
router.post("/login", login)


export default router;