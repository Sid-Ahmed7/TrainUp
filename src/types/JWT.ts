import { Role } from "../enums/Role";

export interface JWT {
    id:string;
    role: Role;
    iat?:number;
    exp?: number;
}