import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { TargetService } from "../services/target.service";
import { CreateTargetDTO } from "../DTO/Target/createTarget.dto";
import { UpdateTargetDTO } from "../DTO/Target/updateTarget.dto";

const targetService = new TargetService();
export class TargetController {
  async createTarget(req: Request, res: Response) {
    const dto = plainToClass(CreateTargetDTO, req.body);

    try {
      const target = await targetService.createTarget(dto);
      res.status(201).json(target);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllTargets(req: Request, res: Response) {
    const target = await targetService.findAllTarget();
    res.status(200).json(target);
  }

  async getTarget(req: Request, res: Response) {
    const target = await targetService.findTargetById(Number(req.params.id));

    if (!target) {
      return res.status(404).json({ message: "Aucune audience trouvé" });
    }

    res.status(200).json(target);
  }

  async updateTarget(req: Request, res: Response) {
    const dto = plainToClass(UpdateTargetDTO, req.body);
    const id = Number(req.params.id);
    try {
      const updatedTarget = await targetService.updateTarget(id, dto);
      if (!updatedTarget) {
        return res.status(404).json({ message: "Aucune audience trouvé" });
      }
      return res.status(200).json(updatedTarget);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTarget(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const deletedTarget = await targetService.deleteTarget(id);
    if (!deletedTarget) {
      return res.status(404).json({ message: "Aucune audience trouvé" });
    }
    res.status(204).send();
  }
}
