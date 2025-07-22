import { Expose } from "class-transformer";

export class UpdateTrainingSessionDTO {
  @Expose()
  startDate?: string;

  @Expose()
  caloriesBurned?: number;

  @Expose()
  duration?: number;
}