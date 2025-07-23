import { Expose } from "class-transformer";

export class UpdateRewardDTO {
    @Expose()
    name?: string;

    @Expose()
    description?: string;

    @Expose()
    rewardType?: string;

    @Expose()
    rewardValue?: string;

    @Expose()
    ruleType?: string;

    @Expose()
    ruleValue?: number;

    @Expose()
    isActive?: boolean;
} 