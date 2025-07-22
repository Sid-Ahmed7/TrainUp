import express from 'express'
import {AuthController } from "../controllers/auth.controller"
import { verifyRefreshToken, verifyToken } from '../middlewares/auth';


const router = express.Router();

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/refresh-token", verifyRefreshToken, (req, res, next) => {
	Promise.resolve(AuthController.refreshToken(req, res)).catch(next);
})

export default router;