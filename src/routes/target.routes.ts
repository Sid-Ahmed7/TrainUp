import express from "express";
import { TargetController } from "../controllers/target.controller";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";

import { Role } from "../enums/Role";

const router = express.Router();
const targetController = new TargetController()

router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  targetController.createTarget
);

router.get("/", targetController.getAllTargets);

router.get("/:id", (req, res, next) => {
  targetController.getTarget(req, res).catch(next);
});

router.put(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    targetController.updateTarget(req, res).catch(next);
  }
);

router.delete(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    targetController.deleteTarget(req, res).catch(next);
  }
);

export default router;
