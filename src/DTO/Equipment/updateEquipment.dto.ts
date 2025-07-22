import { Expose } from "class-transformer";

export class UpdateEquipmentDTO {

    @Expose()
    name?: string;

    @Expose()
    description?: string;
}