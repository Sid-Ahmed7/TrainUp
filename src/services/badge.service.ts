import AppDataSource from "../config/db";
import { CreateBadgeDTO } from "../DTO/Badge/CreateBadgeDTO";
import { Badge } from "../entities/Badge";
import { UserBadge } from "../entities/UserBadge";
import { User } from "../entities/User";
import { TrainingSession } from "../entities/TrainingSession";

const badgeRepository = AppDataSource.getRepository(Badge);
const userBadgeRepository = AppDataSource.getRepository(UserBadge);
const userRepository = AppDataSource.getRepository(User);
const trainingSessionRepository = AppDataSource.getRepository(TrainingSession);

export class BadgeService {

    async createBadge(dto: CreateBadgeDTO) {
    const existingBadge = await badgeRepository.findOne({
        where: { name: dto.name }
    });

    if (existingBadge) {
        throw new Error("Un badge avec ce nom existe déjà");
    }

            const badge = badgeRepository.create({
            name: dto.name,
            description: dto.description,
            points: dto.points || 0,
            ruleType: dto.ruleType,
            ruleValue: dto.ruleValue || 0,
            isActive: dto.isActive !== undefined ? dto.isActive : true
        });

        return badgeRepository.save(badge);
    }

     async getAllBadges() {
        return badgeRepository.find({
            order: { createdAt: "DESC" }
        });
    }

     async getBadgeById(badgeId: number) {
        return badgeRepository.findOne({
            where: { id: badgeId }
        });
    }

     async deleteBadge(badgeId: number) {
        const badge = await badgeRepository.findOne({ where: { id: badgeId } });
        
        if (!badge) {
            throw new Error("Badge introuvable");
        }

        return badgeRepository.delete(badgeId);
    }

     async awardBadgeToUser(userId: string, badgeId: number, reason?: string) {
        const existingUserBadge = await userBadgeRepository.findOne({
            where: { userId, badgeId }
        });

        if (existingUserBadge) {
            throw new Error("L'utilisateur possède déjà ce badge");
        }

        const userBadge = userBadgeRepository.create({
            userId,
            badgeId,
            reason
        });

        return userBadgeRepository.save(userBadge);
    }

     async getUserBadges(userId: string) {
        return userBadgeRepository.find({
            where: { userId },
            relations: ["badge"],
            order: { earnedAt: "DESC" }
        });
    }

     async checkAndAwardBadges(userId: string) {
        const activeBadges = await badgeRepository.find({
            where: { isActive: true }
        });

        const userBadges = await this.getUserBadges(userId);
        const earnedBadgeIds = userBadges.map(ub => ub.badgeId);

        const newBadges = [];

        for (const badge of activeBadges) {
            if (earnedBadgeIds.includes(badge.id)) {
                continue;
            }

            const shouldAward = await this.checkBadgeRule(userId, badge);
            
            if (shouldAward) {
                try {
                    const newBadge = await this.awardBadgeToUser(
                        userId, 
                        badge.id, 
                        shouldAward.reason
                    );
                    newBadges.push(newBadge);
                } catch (error) {
                }
            }
        }

        return newBadges;
    }

    private  async checkBadgeRule(userId: string, badge: Badge) {
        if (!badge.ruleType || !badge.ruleValue) {
            return null;
        }

        switch (badge.ruleType) {
            case "challenges_completed":
                const completedChallenges = await trainingSessionRepository.count({
                    where: { user: { id: userId } }
                });
                if (completedChallenges >= badge.ruleValue) {
                    return {
                        reason: `${completedChallenges} défis complétés`
                    };
                }
                break;

            case "consecutive_days":
                const consecutiveDays = await this.getConsecutiveTrainingDays(userId);
                if (consecutiveDays >= badge.ruleValue) {
                    return {
                        reason: `${consecutiveDays} jours consécutifs`
                    };
                }
                break;

            case "total_points":
                const totalPoints = await this.getUserTotalPoints(userId);
                if (totalPoints >= badge.ruleValue) {
                    return {
                        reason: `${totalPoints} points obtenus`
                    };
                }
                break;
        }

        return null;
    }

    private  async getConsecutiveTrainingDays(userId: string): Promise<number> {
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

    private  async getUserTotalPoints(userId: string): Promise<number> {
        const userBadges = await userBadgeRepository.find({
            where: { userId },
            relations: ["badge"]
        });

        return userBadges.reduce((total, userBadge) => {
            return total + (userBadge.badge.points || 0);
        }, 0);
    }
} 