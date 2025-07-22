import { Expose } from "class-transformer";

export class CreateBadgeDTO {
    @Expose()
    name!: string;

    @Expose()
    description!: string;

    @Expose()
    points?: number;

    @Expose()
    ruleType?: string;

    @Expose()
    ruleValue?: number;

    @Expose()
    isActive?: boolean;
} 