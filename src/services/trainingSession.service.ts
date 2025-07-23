import { TrainingSession } from "../entities/TrainingSession";
import { User } from "../entities/User";
import { Challenge } from "../entities/Challenge";
import AppDataSource from "../config/db";
import { CreateTrainingSessionDTO } from "../DTO/TrainingSession/createSession.dto";
import { UpdateTrainingSessionDTO } from "../DTO/TrainingSession/update.session";
import { BadgeService } from "./badge.service";
import { RewardService } from "./rewardService";
import { Between } from "typeorm";

const badgeService = new BadgeService();
const rewardService = new RewardService();
const trainingSessionRepository = AppDataSource.getRepository(TrainingSession);
const userRepository = AppDataSource.getRepository(User);
const challengeRepository = AppDataSource.getRepository(Challenge);

export class TrainingSessionService {
   async createTrainingSession(dto: CreateTrainingSessionDTO, currentUserId:string) {
    const user = await userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const challenge = await challengeRepository.findOne({
      where: { id: dto.challengeId },
    });

    if (!challenge) {
      throw new Error("Challenge non trouvé");
    }

    const existingSession = await trainingSessionRepository.findOne({
      where: {
        user: { id: currentUserId },
        challenge: { id: dto.challengeId },
        startDate: new Date(dto.startDate),
      },
    });

    if (existingSession) {
      throw new Error(
        "Une séance existe déjà pour cette date et ce challenge."
      );
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
       await badgeService.checkAndAwardBadges(dto.userId);
     } catch (error) {
       console.log("Erreur lors de la vérification des badges:", error);
     }

     try {
       await rewardService.checkAndAwardRewards(dto.userId);
     } catch (error) {
       console.log("Erreur lors de la vérification des récompenses:", error);
     }

     return savedSession;
  }

   async findAllSessionByUser(
    userId: string,
    startDate?: string,
    endDate?: string
  ) {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    const where: any = {
      user: { id: userId },
    };

    if (startDate && endDate) {
      where.startDate = Between(new Date(startDate), new Date(endDate));
    }

    return await trainingSessionRepository.find({
      where: where,
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
      throw new Error("Séance non trouvée");
    }
    if (session.user.id !== currentUserId) {
      throw new Error("Vous ne pouvez pas modifié cette séance");
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

    return trainingSessionRepository.save(session);
  }

   async deleteTrainingSession(sessionId: number, currentUserId: string) {
    const session = await trainingSessionRepository.findOne({
      where: { id: sessionId },
    });
    if (!session) {
      throw new Error("Séance non trouvée");
    }

    if (session.user.id !== currentUserId) {
      throw new Error("Vous ne pouvez pas supprimer cette séance");
    }

    return trainingSessionRepository.remove(session);
  }

   async getTrainingStats(userId: string, challengeId: number) {
    if (!userId || !challengeId) {
      throw new Error("Identifiants utilisateur ou challenge manquants");
    }

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const challenge = await challengeRepository.findOne({
      where: { id: challengeId },
    });

    if (!challenge) {
      throw new Error("Challenge non trouvé");
    }

    if (!challenge.startDate || !challenge.endDate) {
      throw new Error(
        "Les dates de début ou de fin du challenge sont invalides"
      );
    }

    const sessions = await trainingSessionRepository.find({
      where: {
        user: { id: userId },
        challenge: { id: challengeId },
        
      },
    });

    if (sessions.length === 0) {
      throw new Error(
        "Aucune séance trouvée pour cet utilisateur dans ce challenge"
      );
    }

    const totalCalories = sessions.reduce(
      (sum, s) => sum + s.caloriesBurned,
      0
    );
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const sessionCount = sessions.length;

    //Progression en % du nombre de calories attients par rapport au calorie définis dans le défi
    let caloriesProgressPercent = 0;
    if (challenge.targetCalories > 0) {
      caloriesProgressPercent =
        (totalCalories / challenge.targetCalories) * 100;
    } else {
      caloriesProgressPercent = 0;
    }

    //Progression en % du nombre de session attients par rapport au sessions définis dans le défi
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