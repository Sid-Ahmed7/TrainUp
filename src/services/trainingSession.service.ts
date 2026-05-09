import { TrainingSession } from "../entities/TrainingSession";
import { User } from "../entities/User";
import { Challenge } from "../entities/Challenge";
import AppDataSource from "../config/db";
import { CreateTrainingSessionDTO } from "../DTO/TrainingSession/createSession.dto";
import { UpdateTrainingSessionDTO } from "../DTO/TrainingSession/update.session";
import { BadgeService } from "./badge.service";
import { RewardService } from "./rewardService";
import { Between } from "typeorm";
import { AppError } from "../utils/AppError";

const badgeService = new BadgeService();
const rewardService = new RewardService();
const trainingSessionRepository = AppDataSource.getRepository(TrainingSession);
const userRepository = AppDataSource.getRepository(User);
const challengeRepository = AppDataSource.getRepository(Challenge);

export class TrainingSessionService {
  async createTrainingSession(
    dto: CreateTrainingSessionDTO,
    currentUserId: string
  ) {
    const user = await userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new AppError("Utilisateur non trouvé", 404);
    }

    const challenge = await challengeRepository.findOne({
      where: { id: dto.challengeId },
    });

    if (!challenge) {
      throw new AppError("Challenge non trouvé", 404);
    }

    const existingSession = await trainingSessionRepository.findOne({
      where: {
        user: { id: currentUserId },
        challenge: { id: dto.challengeId },
        startDate: new Date(dto.startDate),
      },
    });

    if (existingSession) {
      throw new AppError(
        "Une séance existe déjà pour cette date et ce challenge.", 409);
    }
    const session = trainingSessionRepository.create({
      user,
      challenge,
      startDate: new Date(dto.startDate),
      caloriesBurned: dto.caloriesBurned,
      duration: dto.duration,
    });

    const savedSession = await trainingSessionRepository.save(session);

     try {
       await badgeService.checkAndAwardBadges(currentUserId);
     } catch (Error) {
       console.log("Erreur lors de la vérification des badges:", Error);
     }

     try {
       await rewardService.checkAndAwardRewards(currentUserId);
     } catch (Error) {
       console.log("Erreur lors de la vérification des récompenses:", Error);
     }

    // Retourne la session avec seulement l'id du user
    return {
      ...savedSession,
      user: { id: savedSession.user.id },
    };
  }

   async findAllSessionByUser(userId: string) {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError("Utilisateur non trouvé", 404);
    }
    return await trainingSessionRepository.find({
      where: { user: { id: userId } },
      relations: ["challenge"],
      order: { startDate: "DESC" },
    });
  }

  async updateTrainingSession(
    sessionId: number,
    dto: UpdateTrainingSessionDTO,
    currentUserId: string
  ) {
    const session = await trainingSessionRepository.findOne({
      where: { id: sessionId },
      relations: ["user"],
    });
    if (!session) {
      throw new AppError("Séance non trouvée", 404);
    }
    if (session.user.id !== currentUserId) {
      throw new AppError("Vous ne pouvez pas modifié cette séance", 403);
    }

    if (dto.startDate) {
      session.startDate = new Date(dto.startDate);
    }

    if (dto.caloriesBurned !== undefined) {
      session.caloriesBurned = dto.caloriesBurned;
    }
    if (dto.duration !== undefined) {
      session.duration = dto.duration;
    }

    const updatedSession = await trainingSessionRepository.save(session);
    return {
      ...updatedSession,
      user: { id: updatedSession.user.id },
    };
  }

  async deleteTrainingSession(sessionId: number, currentUserId: string) {
    console.log("Deleting session with ID:", sessionId);
    console.log("Current user ID:", currentUserId);
    const session = await trainingSessionRepository.findOne({
      where: { id: sessionId },
      relations: ["user"],
    });
    if (!session) {
      throw new AppError("Séance non trouvée", 404);
    }

    if (session.user.id !== currentUserId) {
      throw new AppError("Vous ne pouvez pas supprimer cette séance", 403);
    }

    return trainingSessionRepository.remove(session);
  }

  async getTrainingStats(userId: string, challengeId: number) {
    if (!userId || !challengeId) {
      throw new AppError("Identifiants utilisateur ou challenge manquants", 400);
    }

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError("Utilisateur non trouvé", 404);
    }

    const challenge = await challengeRepository.findOne({
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new AppError("Challenge non trouvé", 404);
    }

    if (!challenge.startDate || !challenge.endDate) {
      throw new AppError("Les dates de début ou de fin du challenge sont invalides", 400);
    }

    const sessions = await trainingSessionRepository.find({
      where: {
        user: { id: userId },
        challenge: { id: challengeId },
      },
    });

    if (sessions.length === 0) {
      throw new AppError("Aucune séance trouvée pour cet utilisateur dans ce challenge", 404);
    }

    const totalCalories = sessions.reduce(
      (sum, s) => sum + s.caloriesBurned,
      0
    );
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const sessionCount = sessions.length;

    let caloriesProgressPercent = 0;
    if (challenge.targetCalories > 0) {
      caloriesProgressPercent =
        (totalCalories / challenge.targetCalories) * 100;
    } else {
      caloriesProgressPercent = 0;
    }

    let sessionsProgressPercent = 0;
    if (challenge.requiredSessions > 0) {
      sessionsProgressPercent =
        (sessionCount / challenge.requiredSessions) * 100;
    } else {
      sessionsProgressPercent = 0;
    }

    const totalPercent = Math.round(
      Math.min(caloriesProgressPercent, sessionsProgressPercent, 100)
    );
    return { totalCalories, totalDuration, sessionCount, totalPercent };
  }
}
