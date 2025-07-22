import express from "express";
import * as categoryController from "../controllers/category.controller";
import { verifyRoles } from "../middlewares/verifyRoles";

import { Role } from "../enums/Role";
import { verifyToken } from "../middlewares/auth";

const router = express.Router()

router.post("/nouvelle", verifyToken,verifyRoles(Role.SUPER_ADMIN),categoryController.createCategory)

router.get("/",categoryController.getAllCategories)

router.get("/:id", (req, res, next) => {
	categoryController.getCategory(req, res).catch(next);
});

router.put("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
	categoryController.updateCategory(req, res).catch(next);
});

router.delete("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
	categoryController.deleteCategory(req, res).then(() => {}).catch(next);
});



export default router;