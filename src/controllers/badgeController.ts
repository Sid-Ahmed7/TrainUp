import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateBadgeDTO } from "../DTO/Badge/CreateBadgeDTO";
import { BadgeService } from "../services/badge.service";

export class BadgeController {

    static async createBadge(req: Request, res: Response) {
        try {
            const dto = plainToClass(CreateBadgeDTO, req.body);
            const badge = await BadgeService.createBadge(dto);
            res.status(201).json(badge);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllBadges(req: Request, res: Response) {
        try {
            const badges = await BadgeService.getAllBadges();
            res.status(200).json(badges);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getBadge(req: Request, res: Response) {
        try {
            const badgeId = parseInt(req.params.id);
            const badge = await BadgeService.getBadgeById(badgeId);
            
            if (!badge) {
                return res.status(404).json({ message: "Badge introuvable" });
            }
            
            res.status(200).json(badge);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteBadge(req: Request, res: Response) {
        try {
            const badgeId = parseInt(req.params.id);
            const result = await BadgeService.deleteBadge(badgeId);
            
            if (result.affected === 0) {
                return res.status(404).json({ message: "Badge introuvable" });
            }
            
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async awardBadgeToUser(req: Request, res: Response) {
        try {
            const badgeId = parseInt(req.params.badgeId);
            const userId = req.params.userId;
            const reason = req.body.reason;
            
            const userBadge = await BadgeService.awardBadgeToUser(userId, badgeId, reason);
            res.status(201).json(userBadge);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getUserBadges(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const userBadges = await BadgeService.getUserBadges(userId);
            res.status(200).json(userBadges);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getMyBadges(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const userBadges = await BadgeService.getUserBadges(userId);
            res.status(200).json(userBadges);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async checkAndAwardBadges(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const newBadges = await BadgeService.checkAndAwardBadges(userId);
            res.status(200).json({
                message: `${newBadges.length} nouveaux badges obtenus`,
                badges: newBadges
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
} 