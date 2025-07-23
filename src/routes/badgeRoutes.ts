import express from "express";
import { BadgeController } from "../controllers/badgeController";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { Role } from "../enums/Role";

const router = express.Router();

router.get("/", (req, res, next) => {
    BadgeController.getAllBadges(req, res).catch(next);
});

router.get("/:id", (req, res, next) => {
    BadgeController.getBadge(req, res).catch(next);
});

router.post("/nouveau", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    BadgeController.createBadge(req, res).catch(next);
});

router.put("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    BadgeController.updateBadge(req, res).catch(next);
});

router.delete("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    BadgeController.deleteBadge(req, res).catch(next);
});

router.post("/award/:badgeId/:userId", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    BadgeController.awardBadgeToUser(req, res).catch(next);
});

router.get("/user/my-badges", verifyToken, (req, res, next) => {
    BadgeController.getMyBadges(req, res).catch(next);
});

router.get("/user/:userId", verifyToken, (req, res, next) => {
    BadgeController.getUserBadges(req, res).catch(next);
});

router.post("/check", verifyToken, (req, res, next) => {
    BadgeController.checkAndAwardBadges(req, res).catch(next);
});

export default router; 