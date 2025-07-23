import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { CreateTrainingSessionDTO } from "../DTO/TrainingSession/createSession.dto";
import {TrainingSessionService} from "../services/trainingSession.service"
import { UpdateTrainingSessionDTO } from "../DTO/TrainingSession/update.session";

const trainingSession = new TrainingSessionService()
export class TrainingSessionController {

    async createSession(req: Request, res: Response){
        try {
            const dto = plainToClass(CreateTrainingSessionDTO, req.body)
            const currentUserId = req.user.id
            const session = await trainingSession.createTrainingSession(dto, currentUserId)
            res.status(201).json(session)
        } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }

    }

     async  getSessionByUser(req:Request, res:Response) {
        try {
                const userId = req.user?.id;
                const startDate = req.query.startDate ? String(req.query.startDate) : undefined
                const endDate = req.query.endDate ? String(req.query.endDate) : undefined
                if (!userId) {
                    return res.status(401).json({ error: "Utilisateur non authentifié" });
                }
                const sessions = await trainingSession.findAllSessionByUser(userId, startDate,endDate)
                res.status(200).json(sessions)
                return
            } catch (error) {
                return res.status(400).json({ error: (error as Error).message });
            }
    }
     async updateSession(req: Request, res: Response){
        const dto = plainToClass(UpdateTrainingSessionDTO, req.body);
        const id = Number(req.params.id as string)
        const currentUserId = req.user.id;
        try {
            const updatedSession = await trainingSession.updateTrainingSession(id, dto, currentUserId);
            if (!updatedSession) {
                res.status(200).json({ message: "Aucune session trouvé"})
                return
                }
            res.status(200).json(updatedSession);
            return
        } catch(error: any) {
            res.status(400).json({message: error.message})
            return
        }
    }

     async deleteSesison (req: Request, res: Response)  {
    const id = Number(req.params.id as string);
    const currentUserId = req.user.id;

    await trainingSession.deleteTrainingSession(id,currentUserId);
    res.status(204).send();
    };

     async getTrainingStats(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const challengeId = Number(req.params.challengeId)
            const stats = await trainingSession.getTrainingStats(userId, challengeId)
        
            res.status(200).json(stats)
            return        
        }catch(error: any) {
            res.status(400).json({message: error.message})
            return
        }


    }





}

