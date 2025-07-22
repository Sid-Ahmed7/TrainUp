import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateBadgeDTO } from "../DTO/Badge/CreateBadgeDTO";
import { BadgeService } from "../services/badge.service";

export const createBadge = async (req: Request, res: Response) => {
    try {
        const dto = plainToClass(CreateBadgeDTO, req.body);
        const badge = await BadgeService.createBadge(dto);
        res.status(201).json(badge);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllBadges = async (req: Request, res: Response) => {
    try {
        const badges = await BadgeService.getAllBadges();
        res.status(200).json(badges);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getBadge = async (req: Request, res: Response) => {
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
};

export const deleteBadge = async (req: Request, res: Response) => {
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
}; 