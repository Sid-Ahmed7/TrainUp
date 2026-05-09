import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reward {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("text")
    description!: string;

    @Column()
    rewardType!: string; 

    @Column("text")
    rewardValue!: string; 

    @Column({ nullable: true })
    ruleType?: string; 

    @Column({ default: 0 })
    ruleValue!: number; 

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
} 