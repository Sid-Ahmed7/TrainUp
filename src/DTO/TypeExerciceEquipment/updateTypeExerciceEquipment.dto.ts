import { Expose } from "class-transformer";

export class UpdateTypeExerciceEquipmentDTO {
  @Expose()
  exercice?: number;

  @Expose()
  equipment?: number;
}