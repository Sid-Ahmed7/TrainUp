import express from "express";
import { TrainingRoomController } from "../controllers/trainingRoom.controller";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { Role } from "../enums/Role";

const router = express.Router();
const trainingRoomController = new TrainingRoomController();
// Création d'une salle (OWNER et SUPER_ADMIN)
router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.OWNER, Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.createRoom(req, res).catch(next);
  }
);
router.post(
  "/:id/assign",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.assignRoom(req, res).catch(next);
  }
);

// Liste des salles (tous utilisateurs authentifiés)
router.get("/", verifyToken, (req, res, next) => {
  trainingRoomController.getRooms(req, res).catch(next);
});

// Détails d'une salle par ID
router.get("/:id", verifyToken, (req, res, next) => {
  trainingRoomController.getRoomById(req, res).catch(next);
});

// Modification d'une salle (propriétaire ou SUPER_ADMIN)
router.put("/:id", verifyToken, (req, res, next) => {
  trainingRoomController.updateRoom(req, res).catch(next);
});

// Suppression d'une salle (SUPER_ADMIN uniquement)
router.delete(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.deleteRoom(req, res).catch(next);
  }
);

// Approbation d'une salle (SUPER_ADMIN uniquement)
router.post(
  "/:id/approve",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.approveRoom(req, res).catch(next);
  }
);

// Rejet d'une salle (SUPER_ADMIN uniquement)
router.post(
  "/:id/reject",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    trainingRoomController.rejectRoom(req, res).catch(next);
  }
);

export default router;
