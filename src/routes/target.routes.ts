import express from "express";
import { TargetController } from "../controllers/target.controller";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";

import { Role } from "../enums/Role";

const router = express.Router();

router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  TargetController.createTarget
);

router.get("/", TargetController.getAllTargets);

router.get("/:id", (req, res, next) => {
  TargetController.getTarget(req, res).catch(next);
});

router.put(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    TargetController.updateTarget(req, res).catch(next);
  }
);

router.delete(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    TargetController.deleteTarget(req, res).catch(next);
  }
);

export default router;
