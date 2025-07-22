import { TrainingSession } from "../entities/TrainingSession";
import { User } from "../entities/User";
import { Challenge } from "../entities/Challenge";
import AppDataSource from "../config/db"
import { CreateTrainingSessionDTO } from "../DTO/TrainingSession/createSession.dto";
import { UpdateTrainingSessionDTO } from "../DTO/TrainingSession/update.session";
import { BadgeService } from "./badge.service";

const trainingSessionRepository = AppDataSource.getRepository(TrainingSession)
const userRepository = AppDataSource.getRepository(User)
const challengeRepository = AppDataSource.getRepository(Challenge)


    export const createTrainingSession = async(dto: CreateTrainingSessionDTO) => {

        const user = await userRepository.findOne({where: {id: dto.userId}})
        
        if (!user) {
            throw new Error("Utilisateur non trouvé")
        }

        const challenge = await challengeRepository.findOne({where: {id: dto.challengeId}})

        if(!challenge) {
            throw new  Error("Challenge non trouvé")
        }
        const session = trainingSessionRepository.create({
            user,
            challenge,
            startDate: new Date(dto.startDate),
            caloriesBurned: dto.caloriesBurned,
            duration: dto.duration
        })

        const savedSession = await trainingSessionRepository.save(session)

        // Vérifier automatiquement les nouveaux badges
        try {
            await BadgeService.checkAndAwardBadges(dto.userId);
        } catch (error) {
            console.log("Erreur lors de la vérification des badges:", error);
            // Ne pas faire échouer la création de session si les badges échouent
        }

        return savedSession
    }

    export const findAllSessionByUser = async(userId: string) => {
        if(userId === undefined) {
            throw new Error("Utilisateur non trouvé")
        }

        return await trainingSessionRepository.find({
            where: {user: {id: userId}},
            relations: ["challenge"],
            order: {startDate: "DESC"}
        })
    }

   export const  updateTrainingSession = async(sessionId: number, dto:UpdateTrainingSessionDTO, currentUserId: string ) => {
        const session = await trainingSessionRepository.findOne({ where: { id: sessionId } });
        if (!session) {
            throw new Error("Séance non trouvée");
        } 
        if(session.user.id !== currentUserId) {
            throw new Error("Vous ne pouvez pas modifié cette séance");
        }

        if (dto.startDate) {
            session.startDate = new Date(dto.startDate);
        } 

        if (dto.caloriesBurned !== undefined) {
            session.caloriesBurned = dto.caloriesBurned;
        }
        if (dto.duration !== undefined){
            session.duration = dto.duration;
        }

         return trainingSessionRepository.save(session);
  }

    export const deleteTrainingSession = async(sessionId: number, currentUserId: string) => {
        const session = await trainingSessionRepository.findOne({ where: { id: sessionId } });
        if (!session){
            throw new Error("Séance non trouvée");
        } 

        if(session.user.id !== currentUserId) {
            throw new Error("Vous ne pouvez pas supprimer cette séance");
        }

        return  trainingSessionRepository.remove(session);
    }





