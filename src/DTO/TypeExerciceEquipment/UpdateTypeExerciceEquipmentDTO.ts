import { Expose } from "class-transformer";

export class UpdateTypeExerciceEquipmentDTO {
  @Expose()
  exerciceId?: number;

  @Expose()
  equipmentId?: number;
}