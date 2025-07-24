import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { TargetService } from "../services/target.service";
import { CreateTargetDTO } from "../DTO/Target/createTarget.dto";
import { UpdateTargetDTO } from "../DTO/Target/updateTarget.dto";
import { AppError } from "../utils/AppError";

const targetService = new TargetService();
export class TargetController {
  async createTarget(req: Request, res: Response) {
    const dto = plainToClass(CreateTargetDTO, req.body);

    try {
      const target = await targetService.createTarget(dto);
      res.status(201).json(target);
    } catch (error: any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la création d'une audience" });
      return
    }
  }

  async getAllTargets(req: Request, res: Response) {
    try {
    const target = await targetService.findAllTarget();
    res.status(200).json(target);
    } catch(error:any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la récupération des audiences" });
      return
    }
  }

  async getTarget(req: Request, res: Response) {
    
    try {    
      const target = await targetService.findTargetById(Number(req.params.id));
      res.status(200).json(target);
    } catch(error:any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la récupération d'une audience" });
      return
    }
  }

  async updateTarget(req: Request, res: Response) {
    const dto = plainToClass(UpdateTargetDTO, req.body);
    const id = Number(req.params.id);
    try {
      const updatedTarget = await targetService.updateTarget(id, dto);
      return res.status(200).json(updatedTarget);
    } catch (error: any) {
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la mise à jour d'une audience" });
      return
    }
  }

  async deleteTarget(req: Request, res: Response) {
    const id = Number(req.params.id as string);
    try {
        await targetService.deleteTarget(id);
        res.status(204).send();

    } catch(error:any) {
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la suppression d'une audience" });
      return
    }
    
  }
}
