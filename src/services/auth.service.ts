import AppDataSource from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Register } from "../types/Register";
import { Login } from "../types/Login";

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
  throw new Error("JWT_SECRET ou JWT_EXPIRATION manquant");
}

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  static async register(credentials: Register) {
    const existingUser = await userRepository.findOne({
      where: { email: credentials.email },
    });

    if (existingUser) {
      throw new Error("Email déjà utilisé");
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

  static async login(credentials: Login) {
    const user = await userRepository.findOne({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé ");
    }

    const checkPassword = bcrypt.compareSync(
      credentials.password,
      user.password
    );
    if (!checkPassword) {
      throw new Error("Identifiants invalides");
    }

    const token = await this.generateToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { token, refreshToken };
  }

  static async generateToken(user: User){
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {expiresIn: Number(JWT_EXPIRATION),});
    return token;
  }

  static async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },JWT_SECRET_REFRESH,{ expiresIn: Number(JWT_EXPIRATION_REFRESH) });

    user.refreshToken = refreshToken;
    await userRepository.save(user);

    return refreshToken;
  }
}
