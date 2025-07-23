import express from "express";
import { ChallengeController } from "../controllers/challenge.controller";
import { verifyRefreshToken, verifyToken } from "../middlewares/auth";
import { verifyRoles } from "../middlewares/verifyRoles";
import { Role } from "../enums/Role";

const router = express.Router();
const challengeController = new ChallengeController()

router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.USER),
  challengeController.createChallenge
);
router.get("/", challengeController.getAllChallenge);
router.get(
  "/search",
  verifyToken,
  verifyRoles(Role.USER),
  challengeController.filteredChallenges
);
router.get("/:id", (req, res, next) => {
  challengeController.getChallenge(req, res).catch(next);
});

router.put("/:id", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
  challengeController.updateChallenge(req, res).catch(next);
});

router.delete("/:id", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
  challengeController.deleteChallenge(req, res).catch(next);
});

export default router;
