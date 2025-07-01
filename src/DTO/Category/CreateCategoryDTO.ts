import { Expose } from "class-transformer";

export class CreateCategoryDTO {

    @Expose()
    name!: string;
}