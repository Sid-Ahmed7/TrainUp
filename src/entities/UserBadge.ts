import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Badge } from "./Badge";

@Entity()
export class UserBadge {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column()
    userId!: string;

    @ManyToOne(() => Badge)
    badge!: Badge;

    @Column()
    badgeId!: number;

    @Column({ nullable: true })
    reason?: string; 

    @CreateDateColumn()
    earnedAt!: Date;
} 