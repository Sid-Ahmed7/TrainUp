import express from "express";
import { TrainingRoomController } from "../controllers/trainingRoom.controller";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { Role } from "../enums/Role";

const router = express.Router();
const trainingRoomController = new TrainingRoomController();
router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.OWNER, Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.createRoom(req, res).catch(next);
  }
);
router.put(
  "/:id/assign",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.assignRoom(req, res).catch(next);
  }
);

router.get("/", verifyToken, (req, res, next) => {
  trainingRoomController.getRooms(req, res).catch(next);
});

router.get("/:id", verifyToken, (req, res, next) => {
  trainingRoomController.getRoomById(req, res).catch(next);
});

router.put(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN, Role.OWNER),
  (req, res, next) => {
    trainingRoomController.updateRoom(req, res).catch(next);
  }
);

router.delete(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN, Role.OWNER),
  (req, res, next) => {
    trainingRoomController.deleteRoom(req, res).catch(next);
  }
);

router.post(
  "/:id/approve",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.approveRoom(req, res).catch(next);
  }
);

router.post(
  "/:id/reject",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.rejectRoom(req, res).catch(next);
  }
);

export default router;
