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