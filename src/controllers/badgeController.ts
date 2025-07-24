import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateBadgeDTO } from "../DTO/Badge/CreateBadgeDTO";
import { UpdateBadgeDTO } from "../DTO/Badge/UpdateBadgeDTO";
import { BadgeService } from "../services/badge.service";
import { AppError } from "../utils/AppError";

const badgeService = new BadgeService()
export class BadgeController {

     async createBadge(req: Request, res: Response) {
        try {
            const dto = plainToClass(CreateBadgeDTO, req.body);
            const badge = await badgeService.createBadge(dto);
            res.status(201).json(badge);
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la création du badge" });
            return
        }
    }

     async getAllBadges(req: Request, res: Response) {
        try {
            const badges = await badgeService.getAllBadges();
            res.status(200).json(badges);
        } catch (error: any) {
             if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération des badges" });
            return
        }
    }

     async getBadge(req: Request, res: Response) {
        try {
            const badgeId = parseInt(req.params.id);
            const badge = await badgeService.getBadgeById(badgeId);
            
            if (!badge) {
                return res.status(404).json({ message: "Badge introuvable" });
            }
            
            res.status(200).json(badge);
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération du badge" });
            return
        }
    }

    async updateBadge(req: Request, res: Response) {
        try {
            const badgeId = parseInt(req.params.id);
            const dto = plainToClass(UpdateBadgeDTO, req.body);
            
            const updatedBadge = await badgeService.updateBadge(badgeId, dto);
            res.status(200).json(updatedBadge);
        } catch (error: any) {
             if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la mise à jour du badge" });
            return
        }
    }

    async deleteBadge(req: Request, res: Response) {
        try {
            const badgeId = parseInt(req.params.id);
            const result = await badgeService.deleteBadge(badgeId);
            
            if (result.affected === 0) {
                return res.status(404).json({ message: "Badge introuvable" });
            }
            
            res.status(204).send();
        } catch (error: any) {
             if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la suppresion du badge" });
            return
        }
    }

     async awardBadgeToUser(req: Request, res: Response) {
        try {
            const badgeId = parseInt(req.params.badgeId);
            const userId = req.params.userId;
            const reason = req.body.reason;
            
            const userBadge = await badgeService.awardBadgeToUser(userId, badgeId, reason);
            res.status(201).json(userBadge);
        } catch (error: any) {
             if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de l'attribution du badge" });
            return
        }
    }

     async getUserBadges(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const userBadges = await badgeService.getUserBadges(userId);
            res.status(200).json(userBadges);
        } catch (error: any) {
             if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération des badges" });
            return
        }
    }

     async getMyBadges(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const userBadges = await badgeService.getUserBadges(userId);
            res.status(200).json(userBadges);
        } catch (error: any) {
             if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération des badges" });
            return;
        }
    }

     async checkAndAwardBadges(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const newBadges = await badgeService.checkAndAwardBadges(userId);
            res.status(200).json({
                message: `${newBadges.length} nouveaux badges obtenus`,
                badges: newBadges
            });
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la l'attribution des badges" });
            return
        }
    }
} 