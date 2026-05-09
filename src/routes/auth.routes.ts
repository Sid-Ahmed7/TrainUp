import express from 'express'
import {AuthController } from "../controllers/auth.controller"
import { verifyRefreshToken, verifyToken } from '../middlewares/auth';


const router = express.Router();
const authController = new AuthController();
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/refresh-token", verifyRefreshToken, (req, res, next) => {
	Promise.resolve(authController.refreshToken(req, res)).catch(next);
})

export default router;