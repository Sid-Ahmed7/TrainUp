import { Role } from "../enums/Role";

export interface Register {
    name:string;
    email: string;
    password: string;
    role: Role;
}