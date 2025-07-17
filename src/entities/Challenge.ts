import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeExercice } from "./TypeExercice";
import { User } from "./User";



@Entity()
export class Challenge {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @ManyToMany(() => TypeExercice, { eager: true })
    @JoinTable()
    recommendedExercises!: TypeExercice[];

    @Column()
    objectives!: string;

    @Column() 
    durationMinutes!: number;


    @ManyToOne(() => User, user => user, { eager: true })
    creator!: User;

    @ManyToMany(() => User, user => user.joinedChallenges, { eager: true })
    @JoinTable()
    participants!: User[];

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt!: Date;

}