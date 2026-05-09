import { Expose } from "class-transformer";


export class CreateEquipmentDTO {

    @Expose()
    name!: string;

    @Expose()
    description?: string;
}