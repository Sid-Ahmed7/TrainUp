import { Expose } from "class-transformer";
import { DifficultyLevel } from "../../enums/DifficultyLevel";

export class UpdateChallengeDTO {
  @Expose()
  title?: string;

  @Expose()
  description?: string;

  @Expose()
  objectives?: string;

  @Expose()
  durationMinutes?: number;

  @Expose()
  difficulty?: DifficultyLevel;

  @Expose()
  startDate?: Date;

  @Expose()
  endDate?: Date;

  @Expose()
  targetCalories?: number;

  @Expose()
  requiredSessions?: number;

  @Expose()
  exercises?: number[];

  @Expose()
  participants?: string[];
}
