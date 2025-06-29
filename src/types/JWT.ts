export interface JWT {
    email:string;
    role: string;
    iat?:number;
    exp?: number;
}