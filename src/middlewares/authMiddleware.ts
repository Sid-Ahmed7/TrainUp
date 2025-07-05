import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT } from "../types/JWT";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH!;
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
    } catch(error){
        res.status(401).json({error: "Token invalide ou expiré"});
        return ;
    }
}

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.body.refreshToken;
    
    if(!refreshToken){
        res.status(401).json({error: "Token manquant ou mal formaté"});
        return ;
    }

    const token = refreshToken;
    console.log(refreshToken)

    try {
        const decodedJwt = jwt.verify(token, JWT_SECRET_REFRESH) as JWT;
        (req as any).user = {
            email: decodedJwt.email,
            role: decodedJwt.role,
        };
        next()
    } catch(error){
        res.status(401).json({error: "Token invalide ou expiré"});
        return ;
    }
}