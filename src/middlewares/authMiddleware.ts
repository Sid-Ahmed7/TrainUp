import { NextFunction, Request, Response } from "express";
import AppDataSource from "../config/db";
import jwt from 'jsonwebtoken';
import { JWT } from "../types/JWT";
import { User } from "../entities/User";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const userRepository = AppDataSource.getRepository(User);

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        res.status(401).json({ error: "Token manquant ou mal formaté" });
        return;  
    }

    const token = header.split(" ")[1];

    try {
        const decodedJwt = jwt.verify(token, JWT_SECRET) as JWT;
        const user = await userRepository.findOne({ where: { id: decodedJwt.id } });

        if (!user) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
            return;  
        }

        req.user = user;
        next();  
    } catch (error) {
        res.status(401).json({ error: "Token invalide ou expiré" });
        return;  
    }
};

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        res.status(401).json({ error: "Token manquant ou mal formaté" });
        return;  
    }

    try {
        const decodedJwt = jwt.verify(refreshToken, JWT_SECRET_REFRESH) as JWT;
        const user = await userRepository.findOne({ where: { id: decodedJwt.id } });

        if (!user) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
            return;  
        }

        req.user = user;
        next();  
    } catch (error) {
        res.status(401).json({ error: "Token invalide ou expiré" });
        return;  
    }
};
