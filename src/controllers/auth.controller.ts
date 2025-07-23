import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { Register } from "../types/Register";
import { Login } from "../types/Login";
import AppDataSource from "../config/db";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);
const authService = new AuthService();
export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const credentials: Register = req.body;
      const user = await authService.register(credentials);
      res.status(201).json({ user });
    } catch (error: any) {
      res
        .status(400)
        .json({ error: error.message || "Erreur lors de l'inscription" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const credentials: Login = req.body;
      const { token, refreshToken } = await authService.login(credentials);
      res.status(201).json({ token, refreshToken });
    } catch (error: any) {
      res
        .status(400)
        .json({ error: error.message || "Erreur lors de la connexion" });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { email } = (req as any).user;
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      const newJwt = await authService.generateToken(user);
      const newRefreshToken = await authService.generateRefreshToken(user);

      return res.status(201).json({ newJwt, newRefreshToken });
    } catch (error: any) {
      res.status(400).json({
        error: error.message || "Erreur lors de la generation du refreshToken",
      });
    }
  }
}
