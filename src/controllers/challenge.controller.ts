import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateChallengeDTO } from "../DTO/Challenge/createChallenge.dto";
import { UpdateChallengeDTO } from "../DTO/Challenge/updateChallenge.dto";
import {ChallengeService} from "../services/challenge.service";
import { DifficultyLevel } from "../enums/DifficultyLevel";

export class ChallengeController {

static async createChallenge(req: Request, res: Response) {
    const dto = plainToClass(CreateChallengeDTO, req.body);

    try {
        const challenge = await ChallengeService.createChallenge(dto);
        res.status(201).json(challenge);

    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
}

static async getAllChallenge(req: Request, res: Response) {
    const challenges = await ChallengeService.findAllChallenges();
    res.status(200).json(challenges);
}

static async getChallenge(req: Request, res: Response) {
    const challenge = await ChallengeService.findChallengeId(parseInt(req.params.id as string))
    
    if(!challenge) {
        return res.status(200).json({ message: "Aucun challenge trouvé" })
    }
    
    res.status(200).json(challenge);
}


static async updateChallenge(req: Request, res: Response) {
    const dto = plainToClass(UpdateChallengeDTO, req.body);
    const id = parseInt(req.params.id as string)
    const currentUserId = req.user.id;
    try {
        const updatedChallenge = await ChallengeService.updateChallenge(id, dto, currentUserId);
        if (!updatedChallenge) {
            return res.status(200).json({ message: "Aucun challenge trouvé"})
        
        }
        return res.status(200).json(updatedChallenge);
    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
}

static async deleteChallenge (req: Request, res: Response) {
  const id = parseInt(req.params.id as string);
  const currentUserId = req.user.id;

  const deletedChallenge = await ChallengeService.deleteChallenge(id,currentUserId);
  if (deletedChallenge.affected === 0){
    return res.status(200).json({ message: "Aucun challenge trouvé" });
  }
  res.status(204).send();
};

static async filteredChallenges(req: Request, res: Response) {
    try {
        const difficulty: DifficultyLevel | undefined = req.query.difficulty as DifficultyLevel
        const duration: number | undefined= req.query.duration ? parseInt(req.query.duration as string) : undefined;
        const typeExerciceNames: string[] =  req.query.types ? (req.query.types as string).split(',') : [];

        if (duration !== undefined && duration < 0  ) {
            res.status(400).json({ message: "La durée doit être un nombre positif" });
            return
        }
        const challenges = await ChallengeService.filterChallenges(difficulty, duration,typeExerciceNames);
        console.log(challenges)
        if(challenges.length === 0) {
            res.status(200).json({ message: "Aucun challenge trouvé", data: [] });
            return
        }

        res.status(200).json({data: challenges})
    } catch(error) {
                console.error("Erreur lors du filtrage :", error);

        res.status(400).json({ message: "Erreur interne du serveur" });
    }
}



}