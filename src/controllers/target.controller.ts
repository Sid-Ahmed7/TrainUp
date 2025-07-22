import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import * as TargetService from "../services/target.service";
import { CreateTargetDTO } from "../DTO/Target/createTarget.dto";
import { UpdateTargetDTO } from "../DTO/Target/updateTarget.dto";


export class TargetController {

    static async createTarget(req: Request, res: Response) {
        const dto = plainToClass(CreateTargetDTO, req.body);

        try {
            const target = await TargetService.createTarget(dto);
            res.status(201).json(target);

        } catch(error: any) {
            res.status(500).json({message: error.message})
        }
    }

    static async getAllTargets(req: Request, res: Response) {
        const target = await TargetService.findAllTarget();
        res.status(200).json(target);
    }

    static async getTarget(req: Request, res: Response){
        const target = await TargetService.findTargetById(Number(req.params.id))
        
        if(!target) {
            return res.status(404).json({ message: "Aucune audience trouvé" })
        }
        
        res.status(200).json(target);
    }


    static async updateTarget(req: Request, res: Response){
        const dto = plainToClass(UpdateTargetDTO, req.body);
        const id = parseInt(req.params.id as string)
        try {
            const updatedTarget = await TargetService.updateTarget(id, dto);
            if (!updatedTarget) {
                return res.status(404).json({ message: "Aucune audience trouvé"})
            
            }
            return res.status(200).json(updatedTarget);
        } catch(error: any) {
            res.status(500).json({message: error.message})
        }
    }

    static async deleteTarget(req: Request, res: Response){
    const id = parseInt(req.params.id as string);
    const deletedTarget = await TargetService.deleteTarget(id);
    if (!deletedTarget){
        return res.status(404).json({ message: "Aucune audience trouvé" });
    }
    res.status(204).send();
    };
}

