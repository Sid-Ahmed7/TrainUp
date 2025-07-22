
import { Expose } from "class-transformer";
import { DifficultyLevel } from "../../enums/DifficultyLevel";

export class CreateChallengeDTO {


    @Expose()
    title!: string;

    @Expose()
    description!: string;

    @Expose()
    objectives!: string;

    @Expose()
    durationMinutes!: number;
    
    @Expose()
    difficulty!: DifficultyLevel

    @Expose()
    exercises!: number[];

    @Expose()
    participants?: number[];

    @Expose()
    creatorId!: string;
}