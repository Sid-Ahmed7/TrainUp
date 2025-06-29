import { Request, Response } from "express";
import * as authService from '../services/authService';
import { Register } from "../types/Register";
import { Login } from "../types/Login";

export const register = async (req: Request, res:Response) =>  {

    try {
        const credentials: Register = req.body;
        const user = await authService.register(credentials);
        res.status(201).json({user});
    } catch (error: any) {
        res.status(400).json({error: error.message || 'Erreur lors de l\'inscription'});
    }
};

export const login = async (req: Request, res:Response) =>  {

    try {
        const credentials: Login = req.body;
        const {token} = await authService.login(credentials);
        res.status(201).json({token});
    } catch (error: any) {
        res.status(400).json({error: error.message || 'Erreur lors de la connexion'});
    }
};



