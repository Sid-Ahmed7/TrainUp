import express from "express";
import * as badgeController from "../controllers/badgeController";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { Role } from "../enums/Role";

const router = express.Router();

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

export default router; 