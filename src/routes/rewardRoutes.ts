import express from "express";
import { RewardController } from "../controllers/rewardController";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { Role } from "../enums/Role";

const router = express.Router();
const rewardController = new RewardController();

router.get("/", (req, res, next) => {
    rewardController.getAllRewards(req, res).catch(next);
});

router.get("/:id", (req, res, next) => {
    rewardController.getReward(req, res).catch(next);
});

router.post("/nouveau", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    rewardController.createReward(req, res).catch(next);
});

router.put("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    rewardController.updateReward(req, res).catch(next);
});

router.delete("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    rewardController.deleteReward(req, res).catch(next);
});

router.post("/award/:rewardId/:userId", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    rewardController.awardRewardToUser(req, res).catch(next);
});

router.get("/user/my-rewards", verifyToken, (req, res, next) => {
    rewardController.getMyRewards(req, res).catch(next);
});

router.get("/user/:userId", verifyToken, (req, res, next) => {
    rewardController.getUserRewards(req, res).catch(next);
});

router.patch("/use/:userRewardId", verifyToken, (req, res, next) => {
    rewardController.markRewardAsUsed(req, res).catch(next);
});

router.post("/check", verifyToken, (req, res, next) => {
    rewardController.checkAndAwardRewards(req, res).catch(next);
});

export default router; 