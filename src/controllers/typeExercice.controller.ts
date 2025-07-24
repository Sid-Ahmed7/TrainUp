import { plainToClass } from "class-transformer";
import { CreateTypeExerciceDTO } from "../DTO/TypeExercice/createTypeExercice.dto";
import {TypeExerciceService} from "../services/typeExercice.service";
import { Request, Response } from "express";
import { UpdateTypeExerciceDTO } from "../DTO/TypeExercice/updateTypeExercice.dto";
import { AppError } from "../utils/AppError";

const typeExerciceService = new TypeExerciceService()

export class TypeExerciceController {
  async createTypeExercice (req: Request, res: Response){
  const dto = plainToClass(CreateTypeExerciceDTO, req.body);

  try {
    const exercice = await typeExerciceService.createTypeExercice(dto);
    res.status(201).json(exercice);
  } catch (error: any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
        res.status(500).json({ error: "Erreur lors de la création d'un équipement" });
        return;
  }
};

async getAllTypeExercices(req: Request, res: Response) {
  try {
    const exercices = await typeExerciceService.findAllTypeExercices();
    res.status(200).json(exercices);
  } catch(error:any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la récupération des exrcices" });
      return;
  }
};

async getTypeExercice(req: Request, res: Response){
  const exerciceId = Number(req.params.id)
  try {
    const exercice = await typeExerciceService.findTypeExerciceById(exerciceId)
    res.status(200).json(exercice);
  } catch(error:any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
        res.status(500).json({ error: "Erreur lors de la récupération d'un exercice" });
        return;
  }
};

async updateTypeExercice(req: Request, res: Response) {
  const dto = plainToClass(UpdateTypeExerciceDTO, req.body);
  const id = Number(req.params.id);
  console.log(dto);
  try {
    const updatedTypeExercice = await typeExerciceService.updateTypeExercice(
      id,
      dto
    );
    return res.status(200).json(updatedTypeExercice);
  } catch (error: any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la mise à jour d'un exercice" });
      return;
  }
};

async deleteTypeExercice(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
      await typeExerciceService.deleteTypeExercice(id);
      res.status(204).send();
  } catch(error:any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la suppression d'un exercice" });
      return;
  }

};

}

