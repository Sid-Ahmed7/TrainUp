import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { Register } from "../types/Register";
import { Login } from "../types/Login";
import AppDataSource from "../config/db";
import { User } from "../entities/User";
import { AppError } from "../utils/AppError";

const userRepository = AppDataSource.getRepository(User);
const authService = new AuthService();
export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const credentials: Register = req.body;
      const user = await authService.register(credentials);
      res.status(201).json({ user });
    } catch (error: any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de l'inscription" })
      return
    }
  }

  async login(req: Request, res: Response) {
    try {
      const credentials: Login = req.body;
      const { token, refreshToken } = await authService.login(credentials);
      res.status(201).json({ token, refreshToken });
    } catch (error: any) {
        if(error instanceof AppError) {
         res.status(error.status).json({error: error.message})
         return
        }
      res.status(500).json({ error: "Erreur lors de la connexion" });
      return
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { email } = (req as any).user;
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        return
      }

      const newJwt = await authService.generateToken(user);
      const newRefreshToken = await authService.generateRefreshToken(user);

      return res.status(201).json({ newJwt, newRefreshToken });
    } catch (error: any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la génération du refreshToken" });
      return
    }
  }
}
