import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Challenge } from "./Challenge";
import { User } from "./User";
import { InvitationStatus } from "../enums/InvitationStatus";

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "enum", enum: InvitationStatus, nullable: true})
  status!: InvitationStatus

  @ManyToOne(() => User)
  sender!: User

  @ManyToOne(() => User) 
  receiver!: User

  @ManyToOne(() => Challenge)
  challenge!: Challenge

  @CreateDateColumn()
  sendAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date;

}