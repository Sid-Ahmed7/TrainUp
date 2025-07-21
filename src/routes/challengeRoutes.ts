import express from 'express'
import * as challengeController from "../controllers/challengeController"
import { verifyRefreshToken, verifyToken } from '../middlewares/authMiddleware';
import { verifyRoles } from '../middlewares/verifyRoles';
import { Role } from '../enums/Role';


const router = express.Router();

router.post("/nouveau", verifyToken, verifyRoles(Role.USER) , challengeController.createChallenge )
router.get("/", challengeController.getAllChallenge)
router.get("/:id", (req,res, next) => {
    challengeController.getChallenge(req, res).catch(next);
})

router.put("/:id", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
    challengeController.updateChallenge(req, res).catch(next);
})

router.delete("/:id", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
    challengeController.deleteChallenge(req, res).catch(next);
})

router.get("/search", verifyToken, verifyRoles(Role.USER), challengeController.filteredChallenges)


export default router;