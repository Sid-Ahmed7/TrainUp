import express from "express";
import { BadgeController } from "../controllers/badgeController";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { Role } from "../enums/Role";

const router = express.Router();
const badgeController = new BadgeController()
router.get("/", (req, res, next) => {
    badgeController.getAllBadges(req, res).catch(next);
});

router.get("/:id", (req, res, next) => {
    badgeController.getBadge(req, res).catch(next);
});

router.post("/nouveau", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    badgeController.createBadge(req, res).catch(next);
});

router.delete("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    badgeController.deleteBadge(req, res).catch(next);
});

router.post("/award/:badgeId/:userId", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    badgeController.awardBadgeToUser(req, res).catch(next);
});

router.get("/user/my-badges", verifyToken, (req, res, next) => {
    badgeController.getMyBadges(req, res).catch(next);
});

router.get("/user/:userId", verifyToken, (req, res, next) => {
    badgeController.getUserBadges(req, res).catch(next);
});

router.post("/check", verifyToken, (req, res, next) => {
    badgeController.checkAndAwardBadges(req, res).catch(next);
});

export default router; 