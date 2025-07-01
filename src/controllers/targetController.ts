import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import * as TargetService from "../services/targetService";
import { CreateTargetDTO } from "../DTO/Target/CreateTargetDTO";
import { UpdateTargetDTO } from "../DTO/Target/UpdateTargetDTO";



export const createTarget = async (req: Request, res: Response) => {
    const dto = plainToClass(CreateTargetDTO, req.body);

    try {
        const target = await TargetService.createTarget(dto);
        res.status(201).json(target);

    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

export const getAllTargets = async (req: Request, res: Response) => {
    const target = await TargetService.findAllTarget();
    res.status(200).json(target);
}

export const getTarget = async (req: Request, res: Response) => {
    const target = await TargetService.findTargetById(Number(req.params.id))
    
    if(!target) {
        return res.status(404).json({ message: "Aucune categoey trouvé" })
    }
    
    res.status(200).json(target);
}


export const updateTarget = async (req: Request, res: Response) => {
    const dto = plainToClass(UpdateTargetDTO, req.body);
    const id = Number(req.params.id)
    try {
        const updatedTarget = await TargetService.updateTarget(id, dto);
        if (!updatedTarget) {
            return res.status(404).json({ message: "Aucune categoey trouvé"})
        
        }
        return res.status(200).json(updatedTarget);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

export const deleteTarget = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deletedTarget = await TargetService.deleteTarget(id);
  if (!deletedTarget){
    return res.status(404).json({ message: "Aucune categoey trouvé" });
  }
  res.status(204).send();
};

