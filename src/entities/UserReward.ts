import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Reward } from "./Reward";

@Entity()
export class UserReward {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column()
    userId!: string;

    @ManyToOne(() => Reward)
    reward!: Reward;

    @Column()
    rewardId!: number;

    @Column({ nullable: true })
    reason?: string; 

    @Column({ default: false })
    isUsed!: boolean; 

    @CreateDateColumn()
    earnedAt!: Date;
} 