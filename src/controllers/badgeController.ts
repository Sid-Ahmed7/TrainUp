import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateBadgeDTO } from "../DTO/Badge/CreateBadgeDTO";
import { BadgeService } from "../services/badge.service";

const badgeService = new BadgeService()
export class BadgeController {

     async createBadge(req: Request, res: Response) {
        try {
            const dto = plainToClass(CreateBadgeDTO, req.body);
            const badge = await badgeService.createBadge(dto);
            res.status(201).json(badge);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

     async getAllBadges(req: Request, res: Response) {
        try {
            const badges = await badgeService.getAllBadges();
            res.status(200).json(badges);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
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
            res.status(400).json({ message: error.message });
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
            res.status(400).json({ message: error.message });
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
            res.status(400).json({ message: error.message });
        }
    }

     async getUserBadges(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const userBadges = await badgeService.getUserBadges(userId);
            res.status(200).json(userBadges);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

     async getMyBadges(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const userBadges = await badgeService.getUserBadges(userId);
            res.status(200).json(userBadges);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
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
            res.status(400).json({ message: error.message });
        }
    }
} 