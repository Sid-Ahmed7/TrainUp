import *  as managedUserService from '../services/managedUserService'
import { Request, Response } from 'express'


export const disableAccountsUsers = async (req:Request, res:Response) => {
    try {
        const {userId} = req.body
        await managedUserService.disableAccounts(userId)
        res.status(200).json({message: "Compte désactivé avec succès"})
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}

export const enableAccountsUsers = async (req:Request, res:Response) => {
    try {
        const {userId} = req.body
        await managedUserService.enableAccounts(userId)
        res.status(200).json({message: "Compte activé avec succès"})
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}
export const delteAccountsusers = async (req:Request, res:Response) => {
    try {
        const {userId} = req.body
        await managedUserService.disableAccounts(userId)
        res.status(200).json({message: "Comptes désactivés avec succès"})
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}