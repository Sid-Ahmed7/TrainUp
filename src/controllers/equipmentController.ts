import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import * as equipmentService from "../services/equipmentService";
import { CreateEquipmentDTO } from "../DTO/Equipment/CreateEquipmentDTO";
import { UpdateEquipmentDTO } from "../DTO/Equipment/UpdateEquipmentDTO";



export const createEquipment = async (req: Request, res: Response) => {
    const dto = plainToClass(CreateEquipmentDTO, req.body);

    try {
        const equipment = await equipmentService.createEquipment(dto);
        res.status(201).json(equipment);

    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

export const getAllEquipments = async (req: Request, res: Response) => {
    const equipments = await equipmentService.findAllEquipments();
    res.status(200).json(equipments);
}

export const getEquipment = async (req: Request, res: Response) => {
    const equipment = await equipmentService.findEquipmentById(Number(req.params.id))
    
    if(!equipment) {
        return res.status(404).json({ message: "Aucun equipement trouvé" })
    }
    
    res.status(200).json(equipment);
}


export const updateEquipment = async (req: Request, res: Response) => {
    const dto = plainToClass(UpdateEquipmentDTO, req.body);
    const id = Number(req.params.id)
    try {
        const updatedEquipment = await equipmentService.updateEquipment(id, dto);
        if (!updatedEquipment) {
            return res.status(404).json({ message: "Aucun equipement trouvé"})
        
        }
        return res.status(200).json(updatedEquipment);
    } catch(error: any) {
        res.status(500).json({message: error.message})
    }
}

export const deleteEquipment = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deletedEquipment = await equipmentService.deleteEquipment(id);
  if (!deletedEquipment){
    return res.status(404).json({ message: "Aucun equipement trouvé" });
  }
  res.status(204).send();
};

