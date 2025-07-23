import express from "express";
import { TrainingSessionController } from "../controllers/trainingSession.controller";
import { verifyToken } from "../middlewares/auth";
import { verifyRoles } from "../middlewares/verifyRoles";
import { Role } from "../enums/Role";

const router = express.Router();
const trainingSessionController = new TrainingSessionController();
router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.USER),
  trainingSessionController.createSession
);

router.get(
  "/:userId",
  verifyToken,
  verifyRoles(Role.USER),
  (req, res, next) => {
    trainingSessionController.getSessionByUser(req, res).catch(next);
  }
);

router.put(
  "/:sessionId",
  verifyToken,
  verifyRoles(Role.USER),
  (req, res, next) => {
    trainingSessionController.updateSession(req, res).catch(next);
  }
);

router.delete("/:id", verifyToken, verifyRoles(Role.USER), (req, res, next) => {
  trainingSessionController.deleteSesison(req, res).catch(next);
});

export default router;
