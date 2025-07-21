import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Challenge } from "./Challenge";
import { User } from "./User";

@Entity()
export class TrainingSession {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Challenge, challenge => challenge.sessions)
    challenge!: Challenge

    @ManyToOne(() => User,  user => user.trainingSessions)
    user!: User

    @Column()
    startDate!: Date
    
    @Column('float')
    caloriesBurned!: number

    @Column('float')
    duration!: number

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}