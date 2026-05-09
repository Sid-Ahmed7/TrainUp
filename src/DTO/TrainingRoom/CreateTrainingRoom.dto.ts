
export interface CreateTrainingRoomDTO {
  name: string;
  address: string;
  description?: string;
  capacity: number;
  typeExerciceEquipments: {
    exerciceId: number;
    equipmentId?: number;
  }[];
  phone?: string;
  email?: string;
  website?: string;
}
