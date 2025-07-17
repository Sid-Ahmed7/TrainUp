import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateChallengeDTO } from "../DTO/Challenge/CreateChallengeDTO";
import { UpdateChallengeDTO } from "../DTO/Challenge/UpdateChallengeDTO";
import * as challengeService from "../services/challengeService";

export const createChallenge = async (req: Request, res: Response) => {
    const dto = plainToClass(CreateChallengeDTO, req.body);

    try {
        const challenge = await challengeService.createChallenge(dto);
        res.status(201).json(challenge);

    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

export const getAllChallenge = async (req: Request, res: Response) => {
    const challenges = await challengeService.findAllChallenges();
    res.status(200).json(challenges);
}

export const getChallenge = async (req: Request, res: Response) => {
    const challenge = await challengeService.findChallengeId(Number(req.params.id))
    
    if(!challenge) {
        return res.status(404).json({ message: "Aucun challenge trouvé" })
    }
    
    res.status(200).json(challenge);
}


export const updateChallenge = async (req: Request, res: Response) => {
    const dto = plainToClass(UpdateChallengeDTO, req.body);
    const id = Number(req.params.id)
    try {
        const updatedChallenge = await challengeService.updateChallenge(id, dto);
        if (!updatedChallenge) {
            return res.status(404).json({ message: "Aucun challenge trouvé"})
        
        }
        return res.status(200).json(updatedChallenge);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

export const deleteChallenge = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deletedChallenge = await challengeService.deleteChallenge(id);
  if (deletedChallenge.affected === 0){
    return res.status(404).json({ message: "Aucun challenge trouvé" });
  }
  res.status(204).send();
};


