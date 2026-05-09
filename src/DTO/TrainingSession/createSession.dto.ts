import { Expose } from "class-transformer";

export class CreateTrainingSessionDTO {

  @Expose()
  challengeId!: number;

  @Expose()
  startDate!: string;

  @Expose()
  caloriesBurned!: number;

  @Expose()
  duration!: number;
}


