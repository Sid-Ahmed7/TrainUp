import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { InvitationService } from "../services/invitation.service";
import { SendInvitationDTO } from "../DTO/Invitation/sendInvitation.dto";
import { AppError } from "../utils/AppError";

const invitationService = new InvitationService();
export class InvitationController {
  async sendInvitation(req: Request, res: Response) {
    const dto = plainToClass(SendInvitationDTO, req.body);
    const senderId = req.user.id

    try {
      const invitation = await invitationService.sendInvitation(dto,senderId);
      res.status(201).json(invitation);
    } catch (error: any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de l'envoie d'une invitation" });
      return
    }
  }

  async getSendInvitation(req: Request, res: Response) {
    const senderId = req.user.id

    try {
    const invitations = await invitationService.getSendInvitation(senderId)
    res.status(200).json(invitations);
    } catch(error:any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la récupération des invitations" });
      return
    }
  }

  async getReceiverInvitation(req: Request, res: Response) {
     const receiverId = req.user.id
    try {    
        const invitations = await invitationService.getReceiverInvitation(receiverId)
      res.status(200).json(invitations);
    } catch(error:any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la récupération des invitations"});
      return
    }
  }

  async respondInvitation(req: Request, res: Response) {
    const receiverId = req.user.id;
    const { accept } = req.body;
    const invitationId = Number(req.params.id);
    try {
      const response = await invitationService.respondInvitation(invitationId, receiverId, accept);
      res.status(200).json(response);
      return
    } catch (error: any) {
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la réponse à une invitation" });
      return
    }
  }

  async cancelInvitation (req: Request, res: Response) {
    const senderId = req.user.id;
    const invitationId = Number(req.params.id);
    try {
        await invitationService.cancelInvitation(invitationId, senderId);
        res.status(204).send();

    } catch(error:any) {
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors du refus d'une invitation" });
      return
    } 
  }

    async getAcceptedUsers  (req: Request, res: Response) {
        const challengeId = Number(req.params.challengeId);
    try {
        const users = await invitationService.getAcceptedUser(challengeId);
        res.status(200).json(users);

    } catch(error:any) {
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de l'acceptation d'une invitation" });
      return
    } 
  }
}
