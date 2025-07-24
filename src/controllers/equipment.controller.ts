import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import {EquipmentService} from "../services/equipment.service";
import { CreateEquipmentDTO  } from "../DTO/Equipment/createEquipment.dto";
import { UpdateEquipmentDTO } from "../DTO/Equipment/updateEquipment.dto";
import { AppError } from "../utils/AppError";

const equipmentService = new EquipmentService()

export class EquipementController {
    async createEquipment(req: Request, res: Response){
    const dto = plainToClass(CreateEquipmentDTO, req.body);

    try {
        const equipment = await equipmentService.createEquipment(dto);
        res.status(201).json(equipment);

    } catch(error: any) {
        if(error instanceof AppError) {
            res.status(error.status).json({error: error.message})
            return
        }
        res.status(500).json({ error: "Erreur lors de la création d'un équipement" });
        return
    }
}

 async getAllEquipments(req: Request, res: Response) {
    const equipments = await equipmentService.findAllEquipments();
    res.status(200).json(equipments);
}

 async getEquipment(req: Request, res: Response) {
    const equipmentId = Number(req.params.id)
    try {
        const equipment = await equipmentService.findEquipmentById(equipmentId);
        res.status(200).json(equipment);
    } catch (error:any) {
        if(error instanceof AppError) {
            res.status(error.status).json({error: error.message})
            return
        }
        res.status(500).json({ error: "Erreur lors de la récupération d'un équipement" });
        return
    }
    
}


    async updateEquipment(req: Request, res: Response){
    const dto = plainToClass(UpdateEquipmentDTO, req.body);
    const id = Number(req.params.id)
    try {
        const updatedEquipment = await equipmentService.updateEquipment(id, dto);
        return res.status(200).json(updatedEquipment);
    } catch(error: any) {
        if(error instanceof AppError) {
            res.status(error.status).json({error: error.message})
            return
        }
        res.status(500).json({ error: "Erreur lors de la mise à jour d'un équipement" });
        return
    }
}

 async deleteEquipment(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
      await equipmentService.deleteEquipment(id);
      res.status(204).send();
  } catch (error:any) {
    if(error instanceof AppError) {
            res.status(error.status).json({error: error.message})
            return
        }
        res.status(500).json({ error: "Erreur lors de la suppression d'un équipement" });
        return
  }
}}

