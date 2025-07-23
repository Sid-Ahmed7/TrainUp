import AppDataSource from "../config/db";
import { Equipment } from "../entities/Equipment";

const equipmentRepository = AppDataSource.getRepository(Equipment);

export const createEquipment = async (equipment: Partial<Equipment>) => {
  return equipmentRepository.save(equipmentRepository.create(equipment));
};

export const updateEquipment = async (
  equipmentId: number,
  dto: Partial<Equipment>
) => {
  const equipmentToUpdate = await equipmentRepository.findOneBy({
    id: equipmentId,
  });
  if (!equipmentToUpdate) {
    return null;
  }
  // Mettre à jour uniquement les champs fournis
  if (dto.name !== undefined) equipmentToUpdate.name = dto.name;
  if (dto.description !== undefined)
    equipmentToUpdate.description = dto.description;
  await equipmentRepository.save(equipmentToUpdate);
  return equipmentToUpdate;
};
export const findAllEquipments = () => {
  return equipmentRepository.find();
};

export const findEquipmentById = (equipmentId: number) => {
  return equipmentRepository.findOneBy({ id: equipmentId });
};

export const deleteEquipment = async (equipmentId: number) => {
  const res = await equipmentRepository.delete(equipmentId);
  return res.affected !== 0;
};
