import AppDataSource from "../config/db";
import { CreateTargetDTO } from "../DTO/Target/createTarget.dto";
import { UpdateTargetDTO } from "../DTO/Target/updateTarget.dto";
import { Target } from "../entities/Target";

const targetRepository = AppDataSource.getRepository(Target);

export class TargetService {
  async createTarget(target: CreateTargetDTO) {
    const existing = await targetRepository.findOneBy({ name: target.name });

    if (existing) {
      throw new Error(`L'audience avec le nom "${target.name}" existe déjà.`);
    }
    return await targetRepository.save(targetRepository.create(target));
  }

  async updateTarget(targetId: number, target: UpdateTargetDTO) {
    const updatedTarget = await targetRepository.findOneBy({ id: targetId });
    if (!updatedTarget) {
      throw new Error("Audience non trouvée");
    }
    const res = await targetRepository.update(targetId, target);

    return res;
  }

  async findAllTarget() {
    return await targetRepository.find();
  }

  async findTargetById(targetId: number) {
    return await targetRepository.findOneBy({ id: targetId });
  }

  async deleteTarget(targetId: number) {
    const res = await targetRepository.delete(targetId);
    return res.affected !== 0;
  }
}
