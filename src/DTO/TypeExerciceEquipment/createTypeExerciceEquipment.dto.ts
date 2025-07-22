// src/dto/typeExerciceEquipment.dto.ts
import { Exclude, Expose} from "class-transformer";

export class CreateTypeExerciceEquipmentDTO {
  @Expose()
  exercice!: number; 

  @Expose()
  equipment!: number; 
}