import express from 'express'
import {register, login, refreshToken } from "../controllers/authController"
import { verifyRefreshToken, verifyToken } from '../middlewares/authMiddleware';


const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/refresh-token", verifyRefreshToken, (req, res, next) => {
	Promise.resolve(refreshToken(req, res)).catch(next);
})

export default router;