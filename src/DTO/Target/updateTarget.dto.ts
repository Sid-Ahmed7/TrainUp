import { Expose } from "class-transformer";

export class UpdateTargetDTO {

    @Expose()
    name?: string;
}