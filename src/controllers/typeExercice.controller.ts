import { plainToClass } from "class-transformer";
import { CreateTypeExerciceDTO } from "../DTO/TypeExercice/createTypeExercice.dto";
import * as typeExerciceService from "../services/typeExercice.service";
import { Request, Response } from "express";
import { UpdateTypeExerciceDTO } from "../DTO/TypeExercice/updateTypeExercice.dto";

export const createTypeExercice = async (req: Request, res: Response) => {
  const dto = plainToClass(CreateTypeExerciceDTO, req.body);

  try {
    const exercice = await typeExerciceService.createTypeExercice(dto);
    res.status(201).json(exercice);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTypeExercices = async (req: Request, res: Response) => {
  const exercices = await typeExerciceService.findAllTypeExercices();
  res.status(200).json(exercices);
};

export const getTypeExercice = async (req: Request, res: Response) => {
  const exercice = await typeExerciceService.findTypeExerciceById(
    Number(req.params.id)
  );

  if (!exercice) {
    return res.status(404).json({ message: "Aucun exrcice trouvé" });
  }

  res.status(200).json(exercice);
};

export const updateTypeExercice = async (req: Request, res: Response) => {
  const dto = plainToClass(UpdateTypeExerciceDTO, req.body);
  const id = Number(req.params.id);
  console.log(dto);
  try {
    const updatedTypeExercice = await typeExerciceService.updateTypeExercice(
      id,
      dto
    );
    if (!updatedTypeExercice) {
      return res.status(404).json({ message: "Aucun exercice trouvé" });
    }
    return res.status(200).json(updatedTypeExercice);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTypeExercice = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deletedTypeExercice = await typeExerciceService.deleteTypeExercice(id);
  if (!deletedTypeExercice) {
    return res.status(404).json({ message: "Aucun exercice trouvé" });
  }
  res.status(204).send();
};
