import express from "express";
import {CategoryController} from "../controllers/category.controller";
import { verifyRoles } from "../middlewares/verifyRoles";

import { Role } from "../enums/Role";
import { verifyToken } from "../middlewares/auth";

const router = express.Router()

router.post("/nouvelle", verifyToken,verifyRoles(Role.SUPER_ADMIN),CategoryController.createCategory)

router.get("/",CategoryController.getAllCategories)

router.get("/:id", (req, res, next) => {
	CategoryController.getCategory(req, res).catch(next);
});

router.put("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
	CategoryController.updateCategory(req, res).catch(next);
});

router.delete("/:id", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
	CategoryController.deleteCategory(req, res).then(() => {}).catch(next);
});



export default router;