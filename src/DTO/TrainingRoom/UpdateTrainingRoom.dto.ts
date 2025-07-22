import { TypeExercice } from "../../entities/TypeExercice";

export interface UpdateTrainingRoomDTO {
  name?: string;
  address?: string;
  description?: string;
  capacity?: number;
  equipment?: string[];
  typesExercice: TypeExercice[];
  phone?: string;
  email?: string;
  website?: string;
}
