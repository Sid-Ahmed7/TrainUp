import { RoomStatus } from "../../entities/TrainingRoom";
import { User } from "../../entities/User";
export interface UpdateTrainingRoomOutDTO {
  id: number;
  name?: string;
  address?: string;
  description?: string;
  capacity?: number;
  status?: RoomStatus;
  typeExerciceEquipments: {
    exerciceId: number;
    equipmentId?: number;
  }[];
  phone?: string;
  email?: string;
  website?: string;
  owner?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
