import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateRewardDTO } from "../DTO/Reward/CreateRewardDTO";
import { UpdateRewardDTO } from "../DTO/Reward/UpdateRewardDTO";
import { RewardService } from "../services/rewardService";
import { AppError } from "../utils/AppError";

const rewardService = new RewardService();

export class RewardController {

    async createReward(req: Request, res: Response) {
        const dto = plainToClass(CreateRewardDTO, req.body);
        try {
            const reward = await rewardService.createReward(dto);
            res.status(201).json(reward);
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la création d'une récompense" });
            return
        }
    }

    async getAllRewards(req: Request, res: Response) {
        try {
            const rewards = await rewardService.getAllRewards();
            res.status(200).json(rewards);
        } catch (error: any) {
           if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération des récompenses" });
            return
        }
    }

    async getReward(req: Request, res: Response) {
        const rewardId = Number(req.params.id);
        try {
            const reward = await rewardService.getRewardById(rewardId);
            res.status(200).json(reward);
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération d'une récompense" });
            return
        }
    }

    async updateReward(req: Request, res: Response) {
        const rewardId = parseInt(req.params.id);
        const dto = plainToClass(UpdateRewardDTO, req.body);
        try {
            const updatedReward = await rewardService.updateReward(rewardId, dto);
            res.status(200).json(updatedReward);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteReward(req: Request, res: Response) {
        const rewardId = parseInt(req.params.id);
        try {
            const result = await rewardService.deleteReward(rewardId);         
            res.status(204).send();
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la suppression d'une récompense" });
            return
        }
    }

    async awardRewardToUser(req: Request, res: Response) {
        const rewardId = parseInt(req.params.rewardId);
        const userId = req.params.userId;
        const reason = req.body.reason;
        try {
            const userReward = await rewardService.awardRewardToUser(userId, rewardId, reason);
            res.status(201).json(userReward);
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de l'attribution d'une récompense" });
            return
        }
    }

    async getUserRewards(req: Request, res: Response) {
        const userId = req.params.userId;
        try {
            const userRewards = await rewardService.getUserRewards(userId);
            res.status(200).json(userRewards);
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération des récompenses" });
            return
        }
    }

    async getMyRewards(req: Request, res: Response) {
        const userId = req.user.id;
        try {
            const userRewards = await rewardService.getUserRewards(userId);
            res.status(200).json(userRewards);
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération d'une récompense" });
            return
        }
    }

    async markRewardAsUsed(req: Request, res: Response) {
         const userRewardId = Number(req.params.userRewardId);
         const userId = req.user.id;
        try {
            const updatedReward = await rewardService.markRewardAsUsed(userRewardId, userId);
            res.status(200).json({
                message: "Récompense marquée comme utilisée",
                reward: updatedReward
            });
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors du marquage de la récompense" });
            return
        }
    }

    async checkAndAwardRewards(req: Request, res: Response) {
        const userId = req.user.id;
        try {
            const newRewards = await rewardService.checkAndAwardRewards(userId);
            res.status(200).json({
                message: `${newRewards.length} nouvelles récompenses obtenues`,
                rewards: newRewards
            });
        } catch (error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de l'attribution d'une récompense" });
            return
        }
    }
} 