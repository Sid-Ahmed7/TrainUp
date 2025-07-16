import { RoomStatus } from "../../entities/TrainingRoom";
export interface UpdateTrainingRoomOutDTO {
  id: number;
  name?: string;
  address?: string;
  description?: string;
  capacity?: number;
  status?: RoomStatus;
  equipment?: string[];
  activities?: string[];
  phone?: string;
  email?: string;
  website?: string;
  ownerId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
