import express from "express";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { EquipementController } from "../controllers/equipment.controller";
import { Role } from "../enums/Role";

const router = express.Router();
const equipmentController = new EquipementController()
router.post(
  "/new",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  equipmentController.createEquipment
);
router.get("/", equipmentController.getAllEquipments);
router.get("/:id", (req, res, next) => {
  equipmentController.getEquipment(req, res).catch(next);
});
router.put(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    equipmentController.updateEquipment(req, res).catch(next);
  }
);

router.delete(
  "/:id",
  verifyToken,
  verifyRoles(Role.SUPER_ADMIN),
  (req, res, next) => {
    equipmentController.deleteEquipment(req, res).catch(next);
  }
);

export default router;
