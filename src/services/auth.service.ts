import AppDataSource from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Register } from "../types/Register";
import { Login } from "../types/Login";
import {AppError} from "../utils/AppError"

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION!;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH!;
const JWT_EXPIRATION_REFRESH = process.env.JWT_EXPIRATION_REFRESH;

if (
  !JWT_SECRET ||
  !JWT_EXPIRATION ||
  !JWT_SECRET_REFRESH ||
  !JWT_EXPIRATION_REFRESH
) {
  throw new AppError("JWT_SECRET ou JWT_EXPIRATION manquant", 500);
}

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
   async register(credentials: Register) {
    const existingUser = await userRepository.findOne({
      where: { email: credentials.email },
    });

    if (existingUser) {
      throw new AppError("Email déjà utilisé", 409);
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const user = userRepository.create({
      name: credentials.name,
      email: credentials.email,
      password: hashedPassword,
      role: credentials.role,
    });

    await userRepository.save(user);

    return user;
  }

   async login(credentials: Login) {
    const user = await userRepository.findOne({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new AppError("Utilisateur non trouvé", 404);
    }

    const checkPassword = bcrypt.compareSync(
      credentials.password,
      user.password
    );
    if (!checkPassword) {
      throw new AppError("Identifiants invalides", 401);
    }

    const token = await this.generateToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { token, refreshToken };
  }

   async generateToken(user: User){
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {expiresIn: Number(JWT_EXPIRATION),});
    return token;
  }

   async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },JWT_SECRET_REFRESH,{ expiresIn: Number(JWT_EXPIRATION_REFRESH) });

    user.refreshToken = refreshToken;
    await userRepository.save(user);

    return refreshToken;
  }
}
