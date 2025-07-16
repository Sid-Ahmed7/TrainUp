import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
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

  @Column("text", { array: true, default: [] })
  equipment!: string[];

  @Column("text", { array: true, default: [] })
  activities!: string[];

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

  @Column()
  ownerId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
