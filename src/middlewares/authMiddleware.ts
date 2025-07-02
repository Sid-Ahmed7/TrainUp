import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT } from "../types/JWT";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization;
    
    if(!header || !header.startsWith("Bearer ")){
        res.status(401).json({error: "Token manquant ou mal formaté"});
        return ;
    }

    const token = header.split(" ")[1];

    try {
        const decodedJwt = jwt.verify(token, JWT_SECRET) as JWT;
        (req as any).user = {
      email: decodedJwt.email,
      role: decodedJwt.role,
    };

        next()
    } catch(erro){
        res.status(401).json({error: "Token invalide ou expiré"});
        return ;
    }




}