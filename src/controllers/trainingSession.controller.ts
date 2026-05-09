import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { CreateTrainingSessionDTO } from "../DTO/TrainingSession/createSession.dto";
import { TrainingSessionService } from "../services/trainingSession.service";
import { UpdateTrainingSessionDTO } from "../DTO/TrainingSession/update.session";
import { AppError } from "../utils/AppError";

const trainingSession = new TrainingSessionService();
export class TrainingSessionController {

    async createSession(req: Request, res: Response){
        try {
            const dto = plainToClass(CreateTrainingSessionDTO, req.body)
            const userId = req.user.id
            const session = await trainingSession.createTrainingSession(dto, userId)
            res.status(201).json(session)
        } catch (error:any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la création d'une session d'entraîment" });
            return
    }
  }

     async  getSessionByUser(req:Request, res:Response) {
        try {
                const userId = req.user?.id;
                const sessions = await trainingSession.findAllSessionByUser(userId)
                res.status(200).json(sessions)
                return
            } catch (error) {
                if(error instanceof AppError) {
                    res.status(error.status).json({error: error.message})
                    return
                }
                res.status(500).json({ error: "Erreur lors de la récupération d'une session d'entraînement" });
                return;
            }
    }
     async updateSession(req: Request, res: Response){
        const dto = plainToClass(UpdateTrainingSessionDTO, req.body);
        const id = Number(req.params.id as string)
        const currentUserId = req.user.id;
        try {
            const updatedSession = await trainingSession.updateTrainingSession(id, dto, currentUserId);
            res.status(200).json(updatedSession);
            return
        } catch(error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la mise à jour d'une session d'entraînement" });
            return;
            }
    }

  async deleteSession(req: Request, res: Response) {
        const id = Number(req.params.id as string);
        const currentUserId = req.user.id;
        try {            await trainingSession.deleteTrainingSession(id, currentUserId);
            res.status(204).send();
        } catch(error:any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la suppression d'une session d'entraînement" });
            return;
        }

  }

     async getTrainingStats(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const challengeId = Number(req.params.challengeId)
            const stats = await trainingSession.getTrainingStats(userId, challengeId)
        
            res.status(200).json(stats)
            return        
        }catch(error: any) {
            if(error instanceof AppError) {
                res.status(error.status).json({error: error.message})
                return
            }
            res.status(500).json({ error: "Erreur lors de la récupération des statistiques d'une session d'entraînement" });
            return;
        }


    }





}

