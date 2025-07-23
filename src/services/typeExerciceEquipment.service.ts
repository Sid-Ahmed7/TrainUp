import AppDataSource from "../config/db";
import { Equipment } from "../entities/Equipment";
import { TypeExercice } from "../entities/TypeExercice";
import { TypeExerciceEquipment } from "../entities/TypeExerciceEquipment";

const typeExerciceEquipmentRepository = AppDataSource.getRepository(
  TypeExerciceEquipment
);
const typeExerciceRepository = AppDataSource.getRepository(TypeExercice);
const equipementRepository = AppDataSource.getRepository(Equipment);

export const createTypeExerciceEquipmentWithOutCustom = async (
  exerciceId: number,
  equipementId: number
) => {
  const exercice = await typeExerciceRepository.findOneBy({ id: exerciceId });
  const equipment = await equipementRepository.findOneBy({ id: equipementId });
  if (!exercice || !equipment) {
    throw new Error("Exercice ou Equipement non trouvé");
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
export const createTypeExerciceEquipment = async (
  exerciceId: number,
  equipementId: number
) => {
  const exercice = await typeExerciceRepository.findOneBy({ id: exerciceId });
  const equipment = await equipementRepository.findOneBy({ id: equipementId });
  if (!exercice || !equipment) {
    throw new Error("Exercice ou Equipement non trouvé");
  }

  return await typeExerciceEquipmentRepository.save(
    typeExerciceEquipmentRepository.create({ exercice, equipment })
  );
};

export const getTypeExerciceEquipment = () => {
  return typeExerciceEquipmentRepository.find({
    relations: ["exercice", "equipment"],
  });
};

export const getEquipmentForExercice = async (exerciceId: number) => {
  const equipmentOfExercice = await typeExerciceEquipmentRepository.find({
    where: { exercice: { id: exerciceId } },
    relations: ["equipment"],
  });
  return equipmentOfExercice.map((eq) => eq.equipment);
};

export const deleteByEquipmentId = async (equipmentId: number) => {
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

export const deleteByExerciceId = async (exerciceId: number) => {
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
