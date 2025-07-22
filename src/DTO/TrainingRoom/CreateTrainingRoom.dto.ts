import { TypeExercice } from "../../entities/TypeExercice";

export interface CreateTrainingRoomDTO {
  name: string;
  address: string;
  description?: string;
  capacity: number;
  equipment: string[];
  typeExerciceEquipments: {
    exerciceId: number;
    equipmentId?: number;
  }[];
  phone?: string;
  email?: string;
  website?: string;
}
