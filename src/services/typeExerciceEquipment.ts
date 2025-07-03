import { AppDataSource } from "../app";
import { Equipment } from "../entities/Equipment";
import { TypeExercice } from "../entities/TypeExercice";
import { TypeExerciceEquipment } from "../entities/TypeExerciceEquipment";



const typeExerciceEquipmentRepository = AppDataSource.getRepository(TypeExerciceEquipment)
const typeExerciceRepository = AppDataSource.getRepository(TypeExercice)
const equipementRepository = AppDataSource.getRepository(Equipment)


export const createTypeExerciceEquipment = async (exerciceId: number, equipementId: number) => {
    const exercice = await typeExerciceRepository.findOneBy({id: exerciceId})
    const equipment = await equipementRepository.findOneBy({id: equipementId})

    if (!exercice || !equipment) {
        throw new Error("Exercice ou Equipement non trouvé");
    }

    return typeExerciceEquipmentRepository.save(
        typeExerciceEquipmentRepository.create({ exercice, equipment })
    )
}

export const getTypeExerciceEquipment = () => {
    return typeExerciceEquipmentRepository.find({relations: ["exercice", "equipment"]})
}

export const deleteByEquipmentID = async (equipmentId: number) => {
  const res = await typeExerciceEquipmentRepository.delete({ equipment: { id: equipmentId } });
  return res.affected !== 0;
}

export const deleteByExerciceId = async (exerciceId: number) => {
  const res = await typeExerciceEquipmentRepository.delete({ exercice: { id: exerciceId } });
  return res.affected !== 0;
}

