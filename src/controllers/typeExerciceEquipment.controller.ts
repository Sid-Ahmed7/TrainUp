import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import * as typeExerciceEquipmentService from "../services/typeExerciceEquipment.service";
import { CreateTypeExerciceEquipmentDTO } from "../DTO/TypeExerciceEquipment/createTypeExerciceEquipment.dto";

export const createTypeExerciceEquipment = async (
  req: Request,
  res: Response
) => {
  const dto = plainToClass(CreateTypeExerciceEquipmentDTO, req.body);

  try {
    const typeExerciceEquipment =
      await typeExerciceEquipmentService.createTypeExerciceEquipmentWithOutCustom(
        dto.exercice,
        dto.equipment
      );
    res.status(201).json(typeExerciceEquipment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTypeExerciceEquipment = async (
  req: Request,
  res: Response
) => {
  const typeExercicesEquipments =
    await typeExerciceEquipmentService.getTypeExerciceEquipment();
  res.status(200).json(typeExercicesEquipments);
};

export const deleteByEquipmentId = async (req: Request, res: Response) => {
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

export const deleteByExerciceId = async (req: Request, res: Response) => {
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
