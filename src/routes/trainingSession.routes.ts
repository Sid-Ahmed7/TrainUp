import express from 'express'
import {TrainingSessionController} from "../controllers/trainingSession.controller"
import { verifyRefreshToken, verifyToken } from '../middlewares/auth';
import { verifyRoles } from '../middlewares/verifyRoles';
import { Role } from '../enums/Role';


const router = express.Router();

router.post("/nouveau", verifyToken, verifyRoles(Role.USER) , TrainingSessionController.createSession)

router.get("/:userId", verifyToken, verifyRoles(Role.USER), (req,res, next) => {
    TrainingSessionController.getSessionByUser(req, res).catch(next);
})

router.put("/:sessionId", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
    TrainingSessionController.updateSession(req, res).catch(next);
})

router.delete("/:id", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
    TrainingSessionController.deleteSesison(req, res).catch(next);
})
router.get("/users/:userId/challenges/:challengeId/stats", verifyToken, verifyRoles(Role.USER), TrainingSessionController.getTrainingStats);




export default router;