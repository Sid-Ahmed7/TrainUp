import AppDataSource from "../config/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../entities/User";
import { Register } from "../types/Register";
import { Login } from "../types/Login";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

if (!JWT_SECRET || !JWT_EXPIRATION) {
    throw new Error('JWT_SECRET ou JWT_EXPIRATION manquant');
}


export const register = async (credentials: Register) => {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: {email: credentials.email}});
    
    if(existingUser) {
        throw new Error('Email déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const user = userRepository.create({
        name: credentials.name,
        email: credentials.email,
        password: hashedPassword,
        role: credentials.role
    })

    await userRepository.save(user);

    return user 
}

export const login = async (credentials: Login) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where: {email: credentials.email}});

    if (!user) {
        throw new Error('Identifiants invalides');
    }

    const checkPassword = bcrypt.compareSync(credentials.password, user.password);
    if(!checkPassword) {
        throw new Error('Identifiants invalides');
    }

    const token = jwt.sign({email: user.email, role: user.role}, JWT_SECRET, { expiresIn: '1h' });

    
    return{ token }







}