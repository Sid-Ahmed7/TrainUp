import express from "express";
import * as categoryController from "../controllers/categoryController";
import { verifyRoles } from "../middlewares/verifyRoles";

import { Role } from "../enums/Role";

const router = express.Router()

router.post("/nouvelle",verifyRoles(Role.SUPER_ADMIN),categoryController.createCategory)

router.get("/",categoryController.getAllCategories)

router.get("/:id", (req, res, next) => {
	categoryController.getCategory(req, res).catch(next);
});

router.put("/:id", verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
	categoryController.updateCategory(req, res).catch(next);
});

router.delete("/:id", verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
	categoryController.deleteCategory(req, res).catch(next);
});



export default router;