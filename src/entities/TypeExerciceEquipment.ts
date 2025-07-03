import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeExercice } from "./TypeExercice";
import { Equipment } from "./Equipment";

@Entity()
export class TypeExerciceEquipment {

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => TypeExercice, exercice =>exercice.equipments, {onDelete: 'CASCADE'})
    exercice!: TypeExercice

    @ManyToOne(() =>Equipment, {eager: true})
    equipment!: Equipment

}