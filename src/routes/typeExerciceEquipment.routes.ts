import express from "express";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { TypeExerciceEquipmentController } from "../controllers/typeExerciceEquipment.controller";
import { Role } from "../enums/Role";

const router = express.Router();
const typeExerciceEquipmentController = new TypeExerciceEquipmentController()
router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  typeExerciceEquipmentController.createTypeExerciceEquipment
);
router.get("/", typeExerciceEquipmentController.getAllTypeExerciceEquipment);

router.delete(
  "/equipment/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    typeExerciceEquipmentController.deleteByEquipmentId(req, res).catch(next);
  }
);
router.delete(
  "/exercice/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    typeExerciceEquipmentController.deleteByExerciceId(req, res).catch(next);
  }
);

export default router;
