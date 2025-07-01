// src/dto/typeExerciceEquipment.dto.ts
import { Exclude, Expose} from "class-transformer";

export class CreateTypeExerciceEquipmentDTO {
  @Expose()
  exerciceId!: number; 

  @Expose()
  equipmentId!: number; 
}