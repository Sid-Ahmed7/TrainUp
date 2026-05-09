import AppDataSource from "../config/db";
import { CreateRewardDTO } from "../DTO/Reward/CreateRewardDTO";
import { UpdateRewardDTO } from "../DTO/Reward/UpdateRewardDTO";
import { Reward } from "../entities/Reward";
import { UserReward } from "../entities/UserReward";
import { User } from "../entities/User";
import { TrainingSession } from "../entities/TrainingSession";
import { UserBadge } from "../entities/UserBadge";
import { AppError } from "../utils/AppError";

const rewardRepository = AppDataSource.getRepository(Reward);
const userRewardRepository = AppDataSource.getRepository(UserReward);
const userRepository = AppDataSource.getRepository(User);
const trainingSessionRepository = AppDataSource.getRepository(TrainingSession);
const userBadgeRepository = AppDataSource.getRepository(UserBadge);

export class RewardService {

    async createReward(dto: CreateRewardDTO) {
        const existingReward = await rewardRepository.findOne({
            where: { name: dto.name }
        });

        if (existingReward) {
            throw new AppError("Une récompense avec ce nom existe déjà", 409);
        }

        const reward = rewardRepository.create({
            name: dto.name,
            description: dto.description,
            rewardType: dto.rewardType,
            rewardValue: dto.rewardValue,
            ruleType: dto.ruleType,
            ruleValue: dto.ruleValue || 0,
            isActive: dto.isActive !== undefined ? dto.isActive : true
        });

        return rewardRepository.save(reward);
    }

    async getAllRewards() {
        return rewardRepository.find({
            order: { createdAt: "DESC" }
        });
    }

    async getRewardById(rewardId: number) {
        return rewardRepository.findOne({
            where: { id: rewardId }
        });
    }

    async updateReward(rewardId: number, dto: UpdateRewardDTO) {
        const reward = await rewardRepository.findOne({
            where: { id: rewardId }
        });

        if (!reward) {
            throw new AppError("Récompense introuvable", 404);
        }

        if (dto.name && dto.name !== reward.name) {
            const existingReward = await rewardRepository.findOne({
                where: { name: dto.name }
            });

            if (existingReward) {
                throw new AppError("Une récompense avec ce nom existe déjà", 409);
            }
        }

        if (dto.name !== undefined) reward.name = dto.name;
        if (dto.description !== undefined) reward.description = dto.description;
        if (dto.rewardType !== undefined) reward.rewardType = dto.rewardType;
        if (dto.rewardValue !== undefined) reward.rewardValue = dto.rewardValue;
        if (dto.ruleType !== undefined) reward.ruleType = dto.ruleType;
        if (dto.ruleValue !== undefined) reward.ruleValue = dto.ruleValue;
        if (dto.isActive !== undefined) reward.isActive = dto.isActive;

        return rewardRepository.save(reward);
    }

    async deleteReward(rewardId: number) {
        const reward = await rewardRepository.findOne({ where: { id: rewardId } });
        
        if (!reward) {
            throw new AppError("Récompense introuvable", 404);
        }

        return rewardRepository.delete(rewardId);
    }

    async awardRewardToUser(userId: string, rewardId: number, reason?: string) {
        const existingUserReward = await userRewardRepository.findOne({
            where: { userId, rewardId }
        });

        if (existingUserReward) {
            throw new AppError("L'utilisateur possède déjà cette récompense", 409);
        }

        const userReward = userRewardRepository.create({
            userId,
            rewardId,
            reason
        });

        return userRewardRepository.save(userReward);
    }

    async getUserRewards(userId: string) {
        return userRewardRepository.find({
            where: { userId },
            relations: ["reward"],
            order: { earnedAt: "DESC" }
        });
    }

    async markRewardAsUsed(userRewardId: number, userId: string) {
        const userReward = await userRewardRepository.findOne({
            where: { id: userRewardId, userId }
        });

        if (!userReward) {
            throw new AppError("Récompense introuvable ou non attribuée à cet utilisateur", 404);
        }

        if (userReward.isUsed) {
            throw new AppError("Cette récompense a déjà été utilisée", 409);
        }

        userReward.isUsed = true;
        return userRewardRepository.save(userReward);
    }

    async checkAndAwardRewards(userId: string) {
        const activeRewards = await rewardRepository.find({
            where: { isActive: true }
        });

        const userRewards = await this.getUserRewards(userId);
        const earnedRewardIds = userRewards.map(ur => ur.rewardId);

        const newRewards = [];

        for (const reward of activeRewards) {
            if (earnedRewardIds.includes(reward.id)) {
                continue;
            }

            const shouldAward = await this.checkRewardRule(userId, reward);
            
            if (shouldAward) {
                try {
                    const newReward = await this.awardRewardToUser(
                        userId, 
                        reward.id, 
                        shouldAward.reason
                    );
                    newRewards.push(newReward);
                } catch (AppError) {
                }
            }
        }

        return newRewards;
    }

    private async checkRewardRule(userId: string, reward: Reward) {
        if (!reward.ruleType || !reward.ruleValue) {
            return null;
        }

        switch (reward.ruleType) {
            case "challenges_completed":
                const completedChallenges = await trainingSessionRepository.count({
                    where: { user: { id: userId } }
                });
                if (completedChallenges >= reward.ruleValue) {
                    return {
                        reason: `${completedChallenges} défis complétés`
                    };
                }
                break;

            case "consecutive_days":
                const consecutiveDays = await this.getConsecutiveTrainingDays(userId);
                if (consecutiveDays >= reward.ruleValue) {
                    return {
                        reason: `${consecutiveDays} jours consécutifs`
                    };
                }
                break;

            case "total_points":
                const totalPoints = await this.getUserTotalPoints(userId);
                if (totalPoints >= reward.ruleValue) {
                    return {
                        reason: `${totalPoints} points obtenus`
                    };
                }
                break;
        }

        return null;
    }

    private async getConsecutiveTrainingDays(userId: string): Promise<number> {
        const sessions = await trainingSessionRepository.find({
            where: { user: { id: userId } },
            order: { startDate: "DESC" }
        });

        if (sessions.length === 0) return 0;

        let consecutiveDays = 1;
        let currentDate = new Date(sessions[0].startDate);
        currentDate.setHours(0, 0, 0, 0);

        for (let i = 1; i < sessions.length; i++) {
            const sessionDate = new Date(sessions[i].startDate);
            sessionDate.setHours(0, 0, 0, 0);
            
            const dayDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (dayDiff === 1) {
                consecutiveDays++;
                currentDate = sessionDate;
            } else if (dayDiff > 1) {
                break;
            }
        }

        return consecutiveDays;
    }

    private async getUserTotalPoints(userId: string): Promise<number> {
        const userBadges = await userBadgeRepository.find({
            where: { userId },
            relations: ["badge"]
        });

        return userBadges.reduce((total, userBadge) => {
            return total + (userBadge.badge?.points || 0);
        }, 0);
    }
} 