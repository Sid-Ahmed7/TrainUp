import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import {TypeExerciceEquipmentService} from "../services/typeExerciceEquipment.service";
import { CreateTypeExerciceEquipmentDTO } from "../DTO/TypeExerciceEquipment/createTypeExerciceEquipment.dto";
import { AppError } from "../utils/AppError";


const typeExerciceEquipmentService = new TypeExerciceEquipmentService()

export class TypeExerciceEquipmentController {

async createTypeExerciceEquipment(
  req: Request,
  res: Response
) {
  const dto = plainToClass(CreateTypeExerciceEquipmentDTO, req.body);

  try {
    const typeExerciceEquipment =
      await typeExerciceEquipmentService.createTypeExerciceEquipmentWithOutCustom(
        dto.exercice,
        dto.equipment
      );
    res.status(201).json(typeExerciceEquipment);
  } catch (error: any) {
     if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la création" });
      return;
  }
};


async getAllTypeExerciceEquipment(
  req: Request,
  res: Response
){
  try {
      const typeExercicesEquipments = await typeExerciceEquipmentService.getTypeExerciceEquipment();
      res.status(200).json(typeExercicesEquipments);
  } catch(error:any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la récupération des exercices et équipements" });
      return;
  }
};

async deleteByEquipmentId(req: Request, res: Response){
  const equipmentId = Number(req.params.id);
  const deleted = await typeExerciceEquipmentService.deleteByEquipmentId(
    equipmentId
  );
  if (!deleted) {
    return res
      .status(404)
      .json({ message: "Aucune relation pour cet équipement" });
  }
  res.status(204).send();
};

async deleteByExerciceId(req: Request, res: Response) {
  const exerciceId = Number(req.params.id);
  const deleted = await typeExerciceEquipmentService.deleteByExerciceId(
    exerciceId
  );
  if (!deleted) {
    return res
      .status(404)
      .json({ message: "Aucune relation pour cet exercice" });
  }
  res.status(204).send();
};

}


