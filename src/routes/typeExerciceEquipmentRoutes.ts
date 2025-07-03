import express from "express"
import * as typeExerciceEquipmentController from "../controllers/typeExerciceEquipmentController";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/authMiddleware";

import { Role } from "../enums/Role";

const router = express.Router()



router.post("/nouveau",verifyToken,verifyRoles(Role.SUPER_ADMIN), typeExerciceEquipmentController.createTypeExerciceEquipment)
router.get("/",typeExerciceEquipmentController.getAllTypeExerciceEquipment)



router.delete("/equipment/:id",verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    typeExerciceEquipmentController.deleteByEquipmentId(req, res).catch(next);
});
router.delete("/exrcice/:id",verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    typeExerciceEquipmentController.deleteByExerciceId(req, res).catch(next);
});

export default router;
