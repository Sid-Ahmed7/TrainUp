import AppDataSource from "../config/db";
import { CreateBadgeDTO } from "../DTO/Badge/CreateBadgeDTO";
import { Badge } from "../entities/Badge";

const badgeRepository = AppDataSource.getRepository(Badge);

export class BadgeService {

    static async createBadge(dto: CreateBadgeDTO) {
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
        isActive: dto.isActive !== undefined ? dto.isActive : true
    });

        return badgeRepository.save(badge);
    }

    static async getAllBadges() {
        return badgeRepository.find({
            order: { createdAt: "DESC" }
        });
    }

    static async getBadgeById(badgeId: number) {
        return badgeRepository.findOne({
            where: { id: badgeId }
        });
    }

    static async deleteBadge(badgeId: number) {
        const badge = await badgeRepository.findOne({ where: { id: badgeId } });
        
        if (!badge) {
            throw new Error("Badge introuvable");
        }

        return badgeRepository.delete(badgeId);
    }
} 