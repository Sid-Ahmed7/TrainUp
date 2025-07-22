import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateChallengeDTO } from "../DTO/Challenge/createChallenge.dto";
import { UpdateChallengeDTO } from "../DTO/Challenge/updateChallenge.dto";
import * as challengeService from "../services/challenge.service";
import { DifficultyLevel } from "../enums/DifficultyLevel";

export const createChallenge = async (req: Request, res: Response) => {
    const dto = plainToClass(CreateChallengeDTO, req.body);

    try {
        const challenge = await challengeService.createChallenge(dto);
        res.status(201).json(challenge);

    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
}

export const getAllChallenge = async (req: Request, res: Response) => {
    const challenges = await challengeService.findAllChallenges();
    res.status(200).json(challenges);
}

export const getChallenge = async (req: Request, res: Response) => {
    const challenge = await challengeService.findChallengeId(parseInt(req.params.id as string))
    
    if(!challenge) {
        return res.status(200).json({ message: "Aucun challenge trouvé" })
    }
    
    res.status(200).json(challenge);
}


export const updateChallenge = async (req: Request, res: Response) => {
    const dto = plainToClass(UpdateChallengeDTO, req.body);
    const id = parseInt(req.params.id as string)
    const currentUserId = req.user.id;
    try {
        const updatedChallenge = await challengeService.updateChallenge(id, dto, currentUserId);
        if (!updatedChallenge) {
            return res.status(200).json({ message: "Aucun challenge trouvé"})
        
        }
        return res.status(200).json(updatedChallenge);
    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
}

export const deleteChallenge = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const currentUserId = req.user.id;

  const deletedChallenge = await challengeService.deleteChallenge(id,currentUserId);
  if (deletedChallenge.affected === 0){
    return res.status(200).json({ message: "Aucun challenge trouvé" });
  }
  res.status(204).send();
};

export const filteredChallenges = async(req: Request, res: Response) => {
    try {
        const difficulty: DifficultyLevel | undefined = req.query.difficulty as DifficultyLevel
        const duration: number | undefined= req.query.duration ? parseInt(req.query.duration as string) : undefined;
        const typeExerciceNames: string[] =  req.query.types ? (req.query.types as string).split(',') : [];

        if (duration !== undefined && duration < 0  ) {
            res.status(400).json({ message: "La durée doit être un nombre positif" });
            return
        }
        const challenges = await challengeService.filterChallenges(difficulty, duration,typeExerciceNames);
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


