import { AppDataSource } from "../app";
import { Target } from "../entities/Target";



export const createTarget = async (target: Partial<Target>) => {
    const targetRepository = AppDataSource.getRepository(Target);

    return targetRepository.save(targetRepository.create(target))
}

export const updateTarget = async (targetId: number, target: Partial<Target>) => {
    const targetRepository = AppDataSource.getRepository(Target);

    const updatedTarget = await targetRepository.findOneBy({id: targetId })
    if(!updatedTarget) {
        return 
    }
    const res =await targetRepository.update(targetId,target)

          return res.affected !== 0;
;
}   

export const findAllTarget = () => {
    const targetRepository = AppDataSource.getRepository(Target);

    return targetRepository.find()
}

export const findTargetById = (targetId: number) => {
    const targetRepository = AppDataSource.getRepository(Target);

    return targetRepository.findOneBy({ id: targetId })
}

export const deleteTarget = async (targetId: number) => {
    const targetRepository = AppDataSource.getRepository(Target);

    const res = await targetRepository.delete(targetId);
    return res.affected !== 0;
}   

