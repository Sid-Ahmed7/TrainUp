import AppDataSource from "../config/db";
import { Target } from "../entities/Target";

const targetRepository = AppDataSource.getRepository(Target);

export class TargetService {
  static createTarget = async (target: Partial<Target>) => {
    return targetRepository.save(targetRepository.create(target));
  };

  static updateTarget = async (targetId: number, target: Partial<Target>) => {
    const updatedTarget = await targetRepository.findOneBy({ id: targetId });
    if (!updatedTarget) {
      return;
    }
    const res = await targetRepository.update(targetId, target);

    return res;
  };

  static findAllTarget = () => {
    return targetRepository.find();
  };

  static findTargetById = (targetId: number) => {
    return targetRepository.findOneBy({ id: targetId });
  };

  static deleteTarget = async (targetId: number) => {
    const res = await targetRepository.delete(targetId);
    return res.affected !== 0;
  };
}
