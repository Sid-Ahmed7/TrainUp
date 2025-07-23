import AppDataSource  from "../config/db";
import { CreateTargetDTO } from "../DTO/Target/createTarget.dto";
import { UpdateTargetDTO } from "../DTO/Target/updateTarget.dto";
import { Target } from "../entities/Target";

const targetRepository = AppDataSource.getRepository(Target);

export class TargetService {

    static async createTarget(target: CreateTargetDTO){

        const existing = await targetRepository.findOneBy({ name: target.name });

        if (existing) {
            throw new Error(`L'audience avec le nom "${target.name}" existe déjà.`);
        }
        return targetRepository.save(targetRepository.create(target))
    }

    static async updateTarget(targetId: number, target: UpdateTargetDTO){

    const updatedTarget = await targetRepository.findOneBy({id: targetId })
    if(!updatedTarget) {
        throw new Error("Audience non trouvée");
    }
    const res = await targetRepository.update(targetId,target)

          return res;
}   

    static async  findAllTarget() {
        return targetRepository.find()
    }

    static async findTargetById(targetId: number){
        return targetRepository.findOneBy({ id: targetId })
    }

    static async  deleteTarget(targetId: number) {
        const res = await targetRepository.delete(targetId);
        return res.affected !== 0;
    }   





    
}