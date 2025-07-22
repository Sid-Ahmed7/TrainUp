import { Expose } from "class-transformer";

export class CreateTrainingSessionDTO {
  @Expose()
  userId!: string;

  @Expose()
  challengeId!: number;

  @Expose()
  startDate!: string;

  @Expose()
  caloriesBurned!: number;

  @Expose()
  duration!: number;
}


