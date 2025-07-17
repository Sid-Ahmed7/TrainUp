import AppDataSource  from "../config/db";
import { CreateChallengeDTO } from "../DTO/Challenge/CreateChallengeDTO";
import { UpdateChallengeDTO } from "../DTO/Challenge/UpdateChallengeDTO";
import { Challenge } from "../entities/Challenge";
import { TypeExercice } from "../entities/TypeExercice";
import { User } from "../entities/User";
import { In } from "typeorm";

const challengeRepository = AppDataSource.getRepository(Challenge);
const userRepository = AppDataSource.getRepository(User);
const exerciceRepository = AppDataSource.getRepository(TypeExercice);

export const createChallenge = async (dto: CreateChallengeDTO) => {

    const creator = await userRepository.findOneBy({ id: dto.creatorId})

    if (!creator) {
        throw new Error("le créateur du challenge n'existe pas");
    }

    let exercices: TypeExercice[] = [];
    if(dto.recommendedExercises && dto.recommendedExercises.length > 0) {
        exercices = await exerciceRepository.findBy({id : In(dto.recommendedExercises)})
    }

    let participants: User[] = [];
    if(dto.participants && dto.participants.length > 0) {
        participants = await userRepository.findBy({id : In(dto.participants)})
    }


    const challenge = challengeRepository.create({
        title: dto.title,
        description: dto.description,
        objectives: dto.objectives,
        durationMinutes: dto.durationMinutes,
        recommendedExercises: exercices,
        creator,
        participants
    })

    return challengeRepository.save(challenge);
}

export const updateChallenge = async (challengeId: number, dto: UpdateChallengeDTO) => {
    const challenge = await challengeRepository.findOne({ 
         where: {id: challengeId }, relations: ["recommendedExercises", "participants"]})    
    if (!challenge) {
        throw new Error("Aucun challenge trouvé");
    }

    let exercices: TypeExercice[] = [];
    if(dto.recommendedExercises && dto.recommendedExercises.length > 0) {
        exercices = await exerciceRepository.findBy({id : In(dto.recommendedExercises)})
    }

    let participants: User[] = [];
    if(dto.participants && dto.participants.length > 0) {
        participants = await userRepository.findBy({id : In(dto.participants)})
    }

    if (dto.title !== undefined) {challenge.title = dto.title }
    if (dto.description !== undefined) {challenge.description = dto.description }
    if (dto.objectives !== undefined) {challenge.objectives = dto.objectives }
    if (dto.durationMinutes !== undefined) {challenge.durationMinutes = dto.durationMinutes }
    if (dto.recommendedExercises !== undefined) {challenge.recommendedExercises = exercices }
    if (dto.participants !== undefined) {challenge.participants = participants }
    const res = await challengeRepository.save(challenge);
    return res;
}

export const findAllChallenges = async () => {
    return challengeRepository.find({relations: ["creator", "recommendedExercises", "participants"]});
}

export const findChallengeId = async (challengeId: number) => {
    return challengeRepository.findOne({ where: { id: challengeId }, relations: ["creator", "recommendedExercises", "participants"] });
}

export const deleteChallenge = async (challengeId: number) => {

    return challengeRepository.delete(challengeId);
}


export const shareChallenge = async (challengeId: number, participantsIds: number[]) => {
    const challenge = await challengeRepository.findOne({ 
         where: {id: challengeId }, relations: ["participants"]})   
         
        if (!challenge) {
            throw new Error("Aucun challenge trouvé");
        }
        const participants = await userRepository.findBy({ id: In(participantsIds) })
        if( participants.length === 0) {
            throw new Error("Aucun participant trouvé");
        }
        if(!challenge.participants) {
            challenge.participants = []

            participants.forEach(user =>{
                if(!challenge.participants.find(p => p.id === user.id)) {
                    challenge.participants.push(user);
                }
            })
        }
    return challengeRepository.save(challenge);

}


