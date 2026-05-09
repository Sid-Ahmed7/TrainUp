import AppDataSource from "../config/db";
import { Equipment } from "../entities/Equipment";
import { TypeExercice } from "../entities/TypeExercice";
import { TypeExerciceEquipment } from "../entities/TypeExerciceEquipment";
import { AppError } from "../utils/AppError";

const typeExerciceEquipmentRepository = AppDataSource.getRepository(
  TypeExerciceEquipment
);
const typeExerciceRepository = AppDataSource.getRepository(TypeExercice);
const equipementRepository = AppDataSource.getRepository(Equipment);


export class TypeExerciceEquipmentService {

  async createTypeExerciceEquipmentWithOutCustom(exerciceId: number, equipementId: number) {
  const exercice = await typeExerciceRepository.findOneBy({ id: exerciceId });
  const equipment = await equipementRepository.findOneBy({ id: equipementId });
  if (!exercice || !equipment) {
    throw new AppError("Exercice ou Equipement non trouvé", 404);
  }

  const saved = await typeExerciceEquipmentRepository.save(
    typeExerciceEquipmentRepository.create({ exercice, equipment })
  );
  return {
    id: saved.id,
    exerciceId: exercice.id,
    equipmentId: equipment.id,
  };
};

  async createTypeExerciceEquipment (exerciceId: number,equipementId: number) {
  const exercice = await typeExerciceRepository.findOneBy({ id: exerciceId });
  const equipment = await equipementRepository.findOneBy({ id: equipementId });
  if (!exercice || !equipment) {
    throw new AppError("Exercice ou Equipement non trouvé", 404);
  }

  return await typeExerciceEquipmentRepository.save(
    typeExerciceEquipmentRepository.create({ exercice, equipment })
  );
};

  async getTypeExerciceEquipment() {
  return typeExerciceEquipmentRepository.find({
    relations: ["exercice", "equipment"],
  });
};

  async getEquipmentForExercice(exerciceId: number){
  const equipmentOfExercice = await typeExerciceEquipmentRepository.find({
    where: { exercice: { id: exerciceId } },
    relations: ["equipment"],
  });
  return equipmentOfExercice.map((eq) => eq.equipment);
};

  async deleteByEquipmentId(equipmentId: number) {
  const toDelete = await typeExerciceEquipmentRepository.find({
    where: { equipment: { id: equipmentId } },
    select: ["id"],
  });
  if (!toDelete.length) return false;

  const ids = toDelete
    .map((teq) => teq.id)
    .filter((id) => typeof id === "number" && !isNaN(id));
  if (!ids.length) return false;
  const res = await typeExerciceEquipmentRepository.delete(ids);
  return res.affected !== 0;
};

  async deleteByExerciceId(exerciceId: number) {
  const toDelete = await typeExerciceEquipmentRepository.find({
    where: { exercice: { id: exerciceId } },
    select: ["id"],
  });

  if (!toDelete.length) return false;

  const ids = toDelete
    .map((teq) => teq.id)
    .filter((id) => typeof id === "number" && !isNaN(id));

  if (!ids.length) {
    return false;
  }

  const res = await typeExerciceEquipmentRepository.delete(ids);

  return res.affected !== 0;
};


}