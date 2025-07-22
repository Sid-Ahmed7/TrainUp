import { RoomStatus } from "../../entities/TrainingRoom";
import { TypeExercice } from "../../entities/TypeExercice";
export interface UpdateTrainingRoomOutDTO {
  id: number;
  name?: string;
  address?: string;
  description?: string;
  capacity?: number;
  status?: RoomStatus;
  equipment?: string[];
  typesExercice: TypeExercice[];
  phone?: string;
  email?: string;
  website?: string;
  ownerId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
