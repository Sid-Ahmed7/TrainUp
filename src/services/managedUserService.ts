import AppDataSource from "../config/db";
import { User } from "../entities/User";
import {In} from "typeorm";

const userRepository = AppDataSource.getRepository(User);

export const disableAccounts = async (userId: number[]): Promise<void> => {
       if (!userId.length) {
        throw new Error("Aucun utilisateur choisi");
    }
   
    const users = await userRepository.findBy({id: In(userId)})
    if (users.length == 0) {
        throw new Error("Auncun utilisateur non trouvé");
    }
    for(const user of users) {
    user.isAccountEnabled = false

    }

    await userRepository.save(users)
}


export const enableAccounts = async (userId: number[]): Promise<void> => {
       if (!userId.length) {
        throw new Error("Aucun utilisateur choisi");
    }
   
    const users = await userRepository.findBy({id: In(userId)})
    if (users.length == 0) {
        throw new Error("Auncun utilisateur non trouvé");
    }
    for(const user of users) {
    user.isAccountEnabled = true

    }

    await userRepository.save(users)
}


export const deleteAccounts = async (userId: number[]) => {
    
    const res = await userRepository.delete(userId)
    
    return res.affected !== 0;
}   





