import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TypeExerciceEquipment } from "./TypeExerciceEquipment";

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(
    () => TypeExerciceEquipment,
    (typeExerciceEquipment) => typeExerciceEquipment.equipment
  )
  typeExerciceEquipments!: TypeExerciceEquipment[];
}
