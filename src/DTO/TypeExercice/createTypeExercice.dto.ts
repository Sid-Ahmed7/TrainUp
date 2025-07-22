import { Expose, Type } from "class-transformer";
import { DifficultyLevel } from "../../enums/DifficultyLevel";
import { Environment } from "../../enums/Environment";
import { CreateTypeExerciceEquipmentDTO } from "../TypeExerciceEquipment/createTypeExerciceEquipment.dto";


export class CreateTypeExerciceDTO {
  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  targetMuscles!: string[];

  @Expose()
  categoryId!: number;

  @Expose()
  difficultyLevel!: DifficultyLevel;

  @Expose()
  @Type(() => CreateTypeExerciceEquipmentDTO)
  equipments!: CreateTypeExerciceEquipmentDTO[];

  @Expose()
  environment!: Environment;

  @Expose()
  instructions!: string;

  @Expose()
  tips!: string;

  @Expose()
  imageUrl?: string;

  @Expose()
  complementaryExerciceIds?: number[];

  @Expose()
  audienceIds!: number[];

  @Expose()
  usageCount?: number;

  @Expose()
  averageRating?: number;

  @Expose()
  averageSuccessRate?: number;

  @Expose()
  duration?: number;

  @Expose()
  averageCalories?: number;

  @Expose()
  repetitionsRecommended?: number;

  @Expose()
  durationPerRep?: number;
}
