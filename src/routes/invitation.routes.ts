import { Router } from "express";
import { InvitationController } from "../controllers/invitation.controller";
import { verifyRoles } from "../middlewares/verifyRoles";
import { verifyToken } from "../middlewares/auth";
import { Role } from "../enums/Role";
const router = Router();
const invitationController = new InvitationController();

router.post("/send", verifyToken,verifyRoles(Role.USER), invitationController.sendInvitation);

router.get("/sent", verifyToken,verifyRoles(Role.USER), invitationController.getSendInvitation);

router.get("/received",verifyToken,verifyRoles(Role.USER), invitationController.getReceiverInvitation);

router.post("/:id/respond", verifyToken,verifyRoles(Role.USER), invitationController.respondInvitation);

router.delete("/:id", verifyToken,verifyRoles(Role.USER), invitationController.cancelInvitation);

router.get("/challenge/:challengeId/accepted", verifyToken,verifyRoles(Role.USER), invitationController.getAcceptedUsers);

export default router;
