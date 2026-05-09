import { Expose } from "class-transformer";

export class UpdateCategoryDTO {

    @Expose()
    name?: string;
}