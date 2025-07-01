import {NextFunction, Request,  Response} from 'express';
import { Role } from '../enums/Role';
import { User } from '../entities/User';
import { request } from 'http';



export const verifyRoles = (...allowedRoles :Role[]) => {

    return (req: Request, res:Response, next: NextFunction) => {

        const user: User | undefined  = (req as any).user;

        if(!user || !allowedRoles.includes(user.role)) {
            res.status(403).json({message: "Forbidden"})
            return
        }
            next()
    }




}










