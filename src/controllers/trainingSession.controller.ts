import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateTrainingSessionDTO } from "../DTO/TrainingSession/createSession.dto";
import * as trainingSessionService from "../services/trainingSession.service"
import { UpdateTrainingSessionDTO } from "../DTO/TrainingSession/update.session";





export const createSession = async(req: Request, res: Response) => {
    try {
        const dto = plainToClass(CreateTrainingSessionDTO, req.body)
        const session = await trainingSessionService.createTrainingSession(dto)
        res.status(201).json(session)
    } catch (error) {
     res.status(400).json({ error: (error as Error).message });
  }

}

export const getSessionByUser = async(req:Request, res:Response) => {
    try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: "Utilisateur non authentifié" });
            }
            const sessions = await trainingSessionService.findAllSessionByUser(userId)
            res.status(200).json(sessions)
            return
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
}
export const updateSession = async (req: Request, res: Response) => {
    const dto = plainToClass(UpdateTrainingSessionDTO, req.body);
    const id = parseInt(req.params.id as string)
    const currentUserId = req.user.id;
    try {
        const updatedSession = await trainingSessionService.updateTrainingSession(id, dto, currentUserId);
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

export const deleteSesison = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const currentUserId = req.user.id;

   await trainingSessionService.deleteTrainingSession(id,currentUserId);
  res.status(204).send();
};


