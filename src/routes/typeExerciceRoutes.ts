import express from "express"
import * as typeExerciceController from "../controllers/typeExerciceController";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/authMiddleware";

import { Role } from "../enums/Role";

const router = express.Router()



router.post("/nouveau",verifyToken,verifyRoles(Role.SUPER_ADMIN), typeExerciceController.createTypeExercice)
router.get("/",typeExerciceController.getAllTypeExercices)
router.get("/:id", (req, res, next) => {
    typeExerciceController.getTypeExercice(req, res).catch(next);
});
router.put("/:id",verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    typeExerciceController.updateTypeExercice(req, res).catch(next);
});

router.delete("/:id",verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    typeExerciceController.deleteTypeExercice(req, res).catch(next);
});

export default router;
