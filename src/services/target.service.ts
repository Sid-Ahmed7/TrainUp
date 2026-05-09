import AppDataSource from "../config/db";
import { CreateTargetDTO } from "../DTO/Target/createTarget.dto";
import { UpdateTargetDTO } from "../DTO/Target/updateTarget.dto";
import { Target } from "../entities/Target";
import { AppError } from "../utils/AppError";

const targetRepository = AppDataSource.getRepository(Target);

export class TargetService {
  async createTarget(target: CreateTargetDTO) {
    const existing = await targetRepository.findOneBy({ name: target.name });

    if (existing) {
      throw new AppError(`L'audience avec le nom "${target.name}" existe déjà.`, 409);
    }
    return await targetRepository.save(targetRepository.create(target));
  }

  async updateTarget(targetId: number, dto: UpdateTargetDTO) {
    const targetToUpdate = await targetRepository.findOneBy({ id: targetId });
    if (!targetToUpdate) {
      throw new AppError(`Audience avec l'ID ${targetId} introuvable.`, 404);
    }
    if (dto.name !== undefined) {
      targetToUpdate.name = dto.name;
    }
    const res = await targetRepository.save(targetToUpdate);
    return res;
  }

  async findAllTarget() {
    return await targetRepository.find();
  }

  async findTargetById(targetId: number) {
    const target = await targetRepository.findOneBy({ id: targetId })
    if (!target) {
    throw new AppError("Audience non trouvée", 404);
  }
    return target
  }

  async deleteTarget(targetId: number) {
    const target = await targetRepository.findOneBy({ id: targetId })
    if (!target) {
      throw new AppError("Audience non trouvée", 404);
    }
    const res = await targetRepository.delete(targetId);
    return res.affected !== 0;
  }
}
