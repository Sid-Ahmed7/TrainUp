import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeExercice } from "./TypeExercice";
import { Equipment } from "./Equipment";
import { TrainingRoom } from "./TrainingRoom";

@Entity()
export class TypeExerciceEquipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => TypeExercice, (exercice) => exercice.equipments, {
    onDelete: "CASCADE",
  })
  exercice!: TypeExercice;
  // nullable car on peut avoir un exercice sans équipement
  @ManyToOne(() => Equipment, (equipment) => equipment.typeExerciceEquipments, {
    eager: true,
    nullable: true,
  })
  equipment!: Equipment;

  @ManyToOne(
    () => TrainingRoom,
    (trainingRoom) => trainingRoom.typeExerciceEquipments,
    { onDelete: "CASCADE" }
  )
  trainingRoom!: TrainingRoom;
}
