
import { Expose } from "class-transformer";

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
    recommendedExercises!: number[];

    @Expose()
    participants?: number[];

    @Expose()
    creatorId!: number;
}