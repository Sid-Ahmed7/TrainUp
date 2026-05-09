import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { TypeExerciceEquipment } from "./TypeExerciceEquipment";
export enum RoomStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

@Entity()
export class TrainingRoom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  capacity!: number;

  @OneToMany(() => TypeExerciceEquipment, (tee) => tee.trainingRoom, { cascade: true, eager: true })
  typeExerciceEquipments!: TypeExerciceEquipment[];

  @Column({
    type: "enum",
    enum: RoomStatus,
    default: RoomStatus.PENDING,
  })
  status!: RoomStatus;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  website?: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "ownerId" })
  owner!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
