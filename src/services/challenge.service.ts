import AppDataSource from "../config/db";
import { CreateChallengeDTO } from "../DTO/Challenge/createChallenge.dto";
import { UpdateChallengeDTO } from "../DTO/Challenge/updateChallenge.dto";
import { Challenge } from "../entities/Challenge";
import { TypeExercice } from "../entities/TypeExercice";
import { User } from "../entities/User";
import { In } from "typeorm";
import { DifficultyLevel } from "../enums/DifficultyLevel";
import { AppError } from "../utils/AppError";

const challengeRepository = AppDataSource.getRepository(Challenge);
const userRepository = AppDataSource.getRepository(User);
const exerciceRepository = AppDataSource.getRepository(TypeExercice);

export class ChallengeService {
  async createChallenge(dto: CreateChallengeDTO, creatorId: string) {
    const creator = await userRepository.findOneBy({ id: creatorId });

    if (!creator) {
      throw new AppError("le créateur du challenge n'existe pas", 404);
    }

    const existingChallenge = await challengeRepository.findOne({
      where: {
        title: dto.title,
        creator: { id: creatorId },
      },
    });

    if (existingChallenge) {
      throw new AppError("Un challenge avec ce titre existe déjà.", 409);
    }

    let typeExercises: TypeExercice[] = [];
    if (dto.exercises && dto.exercises.length > 0) {
      typeExercises = await exerciceRepository.findBy({
        id: In(dto.exercises),
      });
    }

    let participants: User[] = [];
    if (dto.participants && dto.participants.length > 0) {
      participants = await userRepository.findBy({ id: In(dto.participants) });
    }

    const challenge = challengeRepository.create({
      title: dto.title,
      description: dto.description,
      objectives: dto.objectives,
      durationMinutes: dto.durationMinutes,
      difficulty: dto.difficulty,
      exercises: typeExercises,
      creator,
      participants,
      startDate: dto.startDate,
      endDate: dto.endDate,
      targetCalories: dto.targetCalories,
      requiredSessions: dto.requiredSessions,
    });

    const savedChallenge = await challengeRepository.save(challenge);

    return {
      ...savedChallenge,
      creator: { id: savedChallenge.creator.id },
    };
  }

  async updateChallenge(
    challengeId: number,
    dto: UpdateChallengeDTO,
    currentUserId: string
  ) {
    const challenge = await challengeRepository.findOne({
      where: { id: challengeId },
      relations: ["exercises", "participants", "creator"],
    });
    if (!challenge) {
      throw new AppError("Aucun challenge trouvé", 404);
    }

    if (challenge.creator.id !== currentUserId) {
      throw new AppError("Vous ne pouvez pas modifié ce challenge", 403);
    }

    let typeExercises: TypeExercice[] = [];
    if (dto.exercises && dto.exercises.length > 0) {
      typeExercises = await exerciceRepository.findBy({
        id: In(dto.exercises),
      });
    }

    let participants: User[] = [];
    if (dto.participants && dto.participants.length > 0) {
      participants = await userRepository.findBy({ id: In(dto.participants) });
    }

    if (dto.title !== undefined) {
      challenge.title = dto.title;
    }
    if (dto.description !== undefined) {
      challenge.description = dto.description;
    }
    if (dto.objectives !== undefined) {
      challenge.objectives = dto.objectives;
    }
    if (dto.durationMinutes !== undefined) {
      challenge.durationMinutes = dto.durationMinutes;
    }
    if (dto.exercises !== undefined) {
      challenge.exercises = typeExercises;
    }
    if (dto.participants !== undefined) {
      challenge.participants = participants;
    }
    if (dto.difficulty !== undefined) {
      if (!Object.values(DifficultyLevel).includes(dto.difficulty)) {
        throw new AppError("Difficulté invalide", 400);
      }
      challenge.difficulty = dto.difficulty;
    }

    if (dto.startDate !== undefined) {
      challenge.startDate = new Date(dto.startDate);
    }
    if (dto.endDate !== undefined) {
      challenge.endDate = new Date(dto.endDate);
    }
    if (dto.targetCalories !== undefined) {
      challenge.targetCalories = dto.targetCalories;
    }
    if (dto.requiredSessions !== undefined) {
      challenge.requiredSessions = dto.requiredSessions;
    }
    const res = await challengeRepository.save(challenge);
    return {
      ...res,
      creator: { id: res.creator.id },
    };
  }

  async findAllChallenges() {
    const challenges = await challengeRepository.find({
      relations: ["creator", "exercises", "participants"],
    });

    const result = challenges.map((challenge) => ({
      ...challenge,
      creator: { id: challenge.creator.id },
    }));

    return result;
  }

  async findChallengeId(challengeId: number) {
    const challenge = await challengeRepository.findOne({
      where: { id: challengeId },
      relations: ["creator", "exercises", "participants"],
    });
    if (!challenge) {
      return null;
    }

    return {
      ...challenge,
      creator: { id: challenge.creator.id },
    };
  }

  async deleteChallenge(challengeId: number, currentUserId: string) {
    const challenge = await challengeRepository.findOne({
      where: { id: challengeId },
      relations: ["creator"],
    });
    if (!challenge) {
      throw new AppError("Aucun challenge trouvé", 404);
    }

    if (challenge.creator.id !== currentUserId) {
      throw new AppError("Vous ne pouvez pas supprimé ce challenge", 403);
    }
    return challengeRepository.delete(challengeId);
  }

  async shareChallenge(challengeId: number, participantsIds: number[]) {
    const challenge = await challengeRepository.findOne({
      where: { id: challengeId },
      relations: ["participants"],
    });

    if (!challenge) {
      throw new AppError("Aucun challenge trouvé", 404);
    }
    const participants = await userRepository.findBy({
      id: In(participantsIds),
    });
    if (participants.length === 0) {
      throw new AppError("Aucun participant trouvé", 404);
    }
    if (!challenge.participants) {
      challenge.participants = [];

      participants.forEach((user) => {
        if (!challenge.participants.find((p) => p.id === user.id)) {
          challenge.participants.push(user);
        }
      });
    }
    return challengeRepository.save(challenge);
  }

  async filterChallenges(
    difficulty?: DifficultyLevel,
    duration?: number,
    typeExerciceNames?: string[]
  ) {
    let query: any = challengeRepository
      .createQueryBuilder("challenge")
      .leftJoinAndSelect("challenge.exercises", "exercise")
      .leftJoinAndSelect("challenge.creator", "creator");

    if (difficulty) {
      query = query.andWhere("challenge.difficulty = :difficulty", {
        difficulty,
      });
    }

    if (duration !== undefined && !isNaN(duration)) {
      query = query.andWhere("challenge.durationMinutes = :duration", {
        duration,
      });
    }

    if (typeExerciceNames && typeExerciceNames.length > 0) {
      query = query.andWhere("exercise.name IN (:...typeExerciceNames)", {
        typeExerciceNames,
      });
    }

    const challenges = await query.getMany();

    const result = challenges.map((challenge: Challenge) => ({
      ...challenge,
      creator: { id: challenge.creator.id },
    }));

    return result;
  }
}
