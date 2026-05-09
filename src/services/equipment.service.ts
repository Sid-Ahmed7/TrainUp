import AppDataSource from "../config/db";
import { CreateEquipmentDTO } from "../DTO/Equipment/createEquipment.dto";
import { UpdateEquipmentDTO } from "../DTO/Equipment/updateEquipment.dto";
import { Equipment } from "../entities/Equipment";
import { AppError } from "../utils/AppError";

const equipmentRepository = AppDataSource.getRepository(Equipment);

export class EquipmentService {
 
    async createEquipment(dto:CreateEquipmentDTO) {
      const existingEquipment = await equipmentRepository.findOneBy({ name: dto.name });
    if (existingEquipment) {
      throw new AppError("Un équipement avec ce nom existe déjà", 409);
    }
    return equipmentRepository.save(equipmentRepository.create(dto));
  };

  async updateEquipment(equipmentId: number, dto:UpdateEquipmentDTO){
    const equipmentToUpdate = await equipmentRepository.findOneBy({
      id: equipmentId,
    });
    if (!equipmentToUpdate) {
      throw new AppError("Équipement non trouvé", 404);
    }

    if (dto.name !== undefined) {equipmentToUpdate.name = dto.name;}
    if (dto.description !== undefined) {equipmentToUpdate.description = dto.description;}
    await equipmentRepository.save(equipmentToUpdate);
    return equipmentToUpdate;
  };


  async findAllEquipments() {
    return equipmentRepository.find();
  };

  async findEquipmentById(equipmentId: number){
    const equipment = await equipmentRepository.findOneBy({
      id: equipmentId,
    });
    if (!equipment) {
      throw new AppError("Équipement non trouvé", 404);
    }
    return equipment;
  };

    async deleteEquipment(equipmentId: number) {
      const equipment = await equipmentRepository.findOneBy({
      id: equipmentId,
    });
    if (!equipment) {
      throw new AppError("Équipement non trouvé", 404);
    }
    const res = await equipmentRepository.delete(equipmentId);
    return res.affected !== 0;
  };

}
