import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { DifficultyLevel } from "../enums/DifficultyLevel";
import { TypeExerciceEquipment } from "./TypeExerciceEquipment";
import { Environment } from "../enums/Environment";
import { Target } from "./Target";
@Entity()
export class TypeExercice {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column("text")
    description!: string

    @Column("simple-array")
    targetMuscles!: string[]

    @ManyToOne(() => Category, undefined, { eager: true })
    @JoinColumn({ name: "category_id"})
    category!: Category;

    @Column({type: "enum", enum: DifficultyLevel, default: DifficultyLevel.BEGINNER})
    difficultyLevel!: DifficultyLevel

    @OneToMany(() => TypeExerciceEquipment, link => link.exercice, { cascade: true, eager: true })
    equipments!: TypeExerciceEquipment[];

    @Column({type: "enum", enum: Environment, default: Environment.MIXED})
    environment!: Environment

    @Column()
    instructions!: string

    @Column()
    tips!: string

    @Column({nullable: true})
    imageUrl?: string

    @ManyToMany(() => TypeExercice)
    @JoinTable()
    complementaryExercice?: TypeExercice[]

    @ManyToMany(() => Target,{eager: true})
    @JoinTable()
    audience!: Target[]

    @Column({ default: 0})
    usageCount!: number;

    @Column({ type: 'float', nullable: true })
    averageRating?: number;

    @Column({ type: 'float', nullable: true })
    averageSuccessRate?: number;

    @Column({ type: 'int', nullable: true })
    duration?: number;

    @Column({ type: 'int', nullable: true })
    averageCalories?: number;

    @Column({ type: 'int', nullable: true })
    repetitionsRecommended?: number;

    @Column({ type: 'int', nullable: true })
    durationPerRep?: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;


}