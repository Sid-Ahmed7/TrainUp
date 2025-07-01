import { Expose } from "class-transformer";

export class CreateTargetDTO {

    @Expose()
    name!: string;
}