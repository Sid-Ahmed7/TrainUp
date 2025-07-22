import { Expose } from "class-transformer";

export class CreateBadgeDTO {
    @Expose()
    name!: string;

    @Expose()
    description!: string;

    @Expose()
    points?: number;

    @Expose()
    isActive?: boolean;
} 