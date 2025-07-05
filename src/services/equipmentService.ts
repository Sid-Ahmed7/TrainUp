import AppDataSource  from "../config/db";
import { Equipment } from "../entities/Equipment";

const equipmentRepository = AppDataSource.getRepository(Equipment);


export const createEquipment = async (equipment: Partial<Equipment>) => {
    return equipmentRepository.save(equipmentRepository.create(equipment));
}

export const updateEquipment = async (equipmentId: number, equipment: Partial<Equipment>) => {
    const updatedEquipment = await equipmentRepository.findOneBy({id: equipmentId});
    if(!updatedEquipment) {
        return null;
    }

    const res = await equipmentRepository.update(equipmentId, equipment);
    return res.affected !== 0;
}

export const findAllEquipments = () => {
    return equipmentRepository.find();
}

export const findEquipmentById = (equipmentId :number) => {
    return equipmentRepository.findOneBy({id: equipmentId})
}

export const deleteEquipment = async (equipmentId: number) => {
    const res = await equipmentRepository.delete(equipmentId);
    return res.affected !== 0;
}