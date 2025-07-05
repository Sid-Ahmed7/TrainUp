import express from "express";
import * as managedUserContorller from "../controllers/managedUserController"
import { verifyRoles } from "../middlewares/verifyRoles";

import { Role } from "../enums/Role";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router()

router.post("/users/disable", verifyToken,verifyRoles(Role.SUPER_ADMIN),managedUserContorller.disableAccountsUsers)
router.post("/users/enable", verifyToken,verifyRoles(Role.SUPER_ADMIN),managedUserContorller.enableAccountsUsers)


router.delete("/users/delete", verifyToken, verifyRoles(Role.SUPER_ADMIN), (req, res, next) => {
    managedUserContorller.delteAccountsusers(req, res).then(() => {}).catch(next);
});



export default router;