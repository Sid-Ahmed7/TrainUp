import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeExercice } from "./TypeExercice";
import { User } from "./User";
import { DifficultyLevel } from "../enums/DifficultyLevel";
import { TrainingSession } from "./TrainingSession";



@Entity()
export class Challenge {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @ManyToMany(() => TypeExercice)
    @JoinTable()
    exercises!: TypeExercice[];

    @Column()
    objectives!: string;
    
    @Column('float', { default: 0 })
    targetCalories!: number; 

    @Column('int', { default: 0 })
    requiredSessions!: number; 

    @Column({ type: 'timestamp', nullable: true })
    startDate!: Date;

    @Column({ type: 'timestamp', nullable: true })
    endDate!: Date;

    @Column() 
    durationMinutes!: number;

    @Column({type:"enum", enum: DifficultyLevel})
    difficulty!: DifficultyLevel

    @ManyToOne(() => User, user => user.createdChallenges)
    creator!: User;

    @ManyToMany(() => User, user => user.joinedChallenges)
    @JoinTable()
    participants!: User[];

    @OneToMany(() => TrainingSession, session => session.challenge)
    sessions!: TrainingSession[]

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt!: Date;

}