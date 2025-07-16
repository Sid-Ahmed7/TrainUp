export interface CreateTrainingRoomDTO {
  name: string;
  address: string;
  description?: string;
  capacity: number;
  equipment: string[];
  activities: string[];
  phone?: string;
  email?: string;
  website?: string;
}
