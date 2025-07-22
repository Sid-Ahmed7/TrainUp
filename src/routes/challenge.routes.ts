import express from "express";
import { ChallengeController } from "../controllers/challenge.controller";
import { verifyRefreshToken, verifyToken } from "../middlewares/auth";
import { verifyRoles } from "../middlewares/verifyRoles";
import { Role } from "../enums/Role";

const router = express.Router();

router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.USER),
  ChallengeController.createChallenge
);
router.get("/", ChallengeController.getAllChallenge);
router.get(
  "/search",
  verifyToken,
  verifyRoles(Role.USER),
  ChallengeController.filteredChallenges
);
router.get("/:id", (req, res, next) => {
  ChallengeController.getChallenge(req, res).catch(next);
});

router.put("/:id", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
  ChallengeController.updateChallenge(req, res).catch(next);
});

router.delete("/:id", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
  ChallengeController.deleteChallenge(req, res).catch(next);
});

export default router;
