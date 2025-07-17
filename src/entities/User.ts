import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums/Role";
import { Challenge } from "./Challenge";



@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role!: Role

    @Column({nullable: true})
    refreshToken?: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Challenge, challenge => challenge.creator)
    createdChallenges!: Challenge[];

    @ManyToMany(() => Challenge, challenge => challenge.participants)
    joinedChallenges!: Challenge[];


}