import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateRewardDTO } from "../DTO/Reward/CreateRewardDTO";
import { UpdateRewardDTO } from "../DTO/Reward/UpdateRewardDTO";
import { RewardService } from "../services/rewardService";

const rewardService = new RewardService();

export class RewardController {

    async createReward(req: Request, res: Response) {
        try {
            const dto = plainToClass(CreateRewardDTO, req.body);
            const reward = await rewardService.createReward(dto);
            res.status(201).json(reward);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllRewards(req: Request, res: Response) {
        try {
            const rewards = await rewardService.getAllRewards();
            res.status(200).json(rewards);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getReward(req: Request, res: Response) {
        try {
            const rewardId = parseInt(req.params.id);
            const reward = await rewardService.getRewardById(rewardId);
            
            if (!reward) {
                return res.status(404).json({ message: "Récompense introuvable" });
            }
            
            res.status(200).json(reward);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateReward(req: Request, res: Response) {
        try {
            const rewardId = parseInt(req.params.id);
            const dto = plainToClass(UpdateRewardDTO, req.body);
            
            const updatedReward = await rewardService.updateReward(rewardId, dto);
            res.status(200).json(updatedReward);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteReward(req: Request, res: Response) {
        try {
            const rewardId = parseInt(req.params.id);
            const result = await rewardService.deleteReward(rewardId);
            
            if (result.affected === 0) {
                return res.status(404).json({ message: "Récompense introuvable" });
            }
            
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async awardRewardToUser(req: Request, res: Response) {
        try {
            const rewardId = parseInt(req.params.rewardId);
            const userId = req.params.userId;
            const reason = req.body.reason;
            
            const userReward = await rewardService.awardRewardToUser(userId, rewardId, reason);
            res.status(201).json(userReward);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUserRewards(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const userRewards = await rewardService.getUserRewards(userId);
            res.status(200).json(userRewards);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getMyRewards(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const userRewards = await rewardService.getUserRewards(userId);
            res.status(200).json(userRewards);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async markRewardAsUsed(req: Request, res: Response) {
        try {
            const userRewardId = parseInt(req.params.userRewardId);
            const userId = req.user.id;
            
            const updatedReward = await rewardService.markRewardAsUsed(userRewardId, userId);
            res.status(200).json({
                message: "Récompense marquée comme utilisée",
                reward: updatedReward
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async checkAndAwardRewards(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const newRewards = await rewardService.checkAndAwardRewards(userId);
            res.status(200).json({
                message: `${newRewards.length} nouvelles récompenses obtenues`,
                rewards: newRewards
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
} 