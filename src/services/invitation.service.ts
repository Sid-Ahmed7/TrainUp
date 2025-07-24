import { In } from "typeorm";
import AppDataSource  from "../config/db";
import { SendInvitationDTO } from "../DTO/Invitation/sendInvitation.dto";
import { Challenge } from "../entities/Challenge";
import { Invitation } from "../entities/Invitation";
import { User } from "../entities/User";
import { InvitationStatus } from "../enums/InvitationStatus";
import { AppError } from "../utils/AppError";

const invitationRepository = AppDataSource.getRepository(Invitation)
const userRepository = AppDataSource.getRepository(User)
const challengeRepository = AppDataSource.getRepository(Challenge)


export class InvitationService {


    async sendInvitation(dto: SendInvitationDTO, senderId: string) {
        const sender = await userRepository.findOneBy({ id: senderId})
        if(!sender) {
            throw new AppError("L'expéditeur de l'invitation est introuvable", 404)
        }

        const receiver = await userRepository.findOneBy({ id: dto.receiverId})
        if(!receiver) {
            throw new AppError("Le destinataire est introuvable", 404)
        }

        if(sender.id === receiver.id) {
            throw new AppError("Vous ne pouvez pas vous inviter vous-même", 400)
        }

        const challenge = await challengeRepository.findOneBy({ id: dto.challengeId})
            if(!challenge) {
                throw new AppError("Le challenge est introuvable", 404)
            }

        const existingInvitation = await invitationRepository.findOne({
            where: {
                sender: {id: senderId},
                receiver: {id: dto.receiverId},
                challenge: {id: dto.challengeId}
            }
        })

        if(!existingInvitation) {
            throw new AppError("Une invitation a déjà été transmise", 409)
        }

        const invitation = invitationRepository.create({
            sender,
            receiver,
            challenge,
            status: InvitationStatus.PENDING,
        })

        return invitationRepository.save(invitation)
    }


    async getSendInvitation(senderId: string) {
        const sender = await userRepository.findOneBy({ id: senderId})
        if(!sender) {
            throw new AppError("L'expéditeur de l'invitation est introuvable", 404)
        }


        return invitationRepository.find({
            where: {sender:{id: senderId}}, relations: ["sender", "receiver","challenge"], order: {sendAt: "DESC"}
        })
    }

    
    async getReceiverInvitation(receiverId: string) {
        const receiver = await userRepository.findOneBy({ id: receiverId})
        if(!receiver) {
            throw new AppError("Le destinataire de l'invitation est introuvable", 404)
        }


        return invitationRepository.find({
            where: {sender:{id: receiverId}}, relations: ["sender", "receiver","challenge"], order: {sendAt: "DESC"}
        })
    }

   async respondInvitation(invitationId: number, receiverId: string,accept: boolean) {
        const receiver = await userRepository.findOneBy({ id: receiverId})
        if(!receiver) {
            throw new AppError("Le destinataire de l'invitation est introuvable", 404)
        }

        const invitation = await invitationRepository.findOne({
            where: {
                id: invitationId,
                receiver: {id: receiverId}
            },
            relations: ["sender", "receiver", "challenge"]

        })

        if (!invitation) {
        throw new AppError("Invitation introuvable", 404);
        }
            
        if(invitation.status !== InvitationStatus.PENDING) {
            throw new AppError("Cette invitation a déjà été traitée", 409);
        }

        invitation.status = accept ? InvitationStatus.ACCEPTED :InvitationStatus.DECLINED
        return invitationRepository.save(invitation)
   }

   async cancelInvitation(invitationId : number, senderId : string) {

        const sender = await userRepository.findOneBy({ id: senderId})
        if(!sender) {
            throw new AppError("L'expéditeur de l'invitation est introuvable", 404)
        }

        const invitation = await invitationRepository.findOne({
            where: {
                id: invitationId,
                sender: {id: senderId}
            },
        })

        if (!invitation) {
        throw new AppError("Invitation introuvable", 404);
        }
    }

    async getAcceptedUser(challengeId: number) {
        const challenge = await challengeRepository.findOneBy({ id: challengeId });
        if (!challenge) {
            throw new AppError("Aucun challenge trouvé", 404);
        }
         const invitations = await invitationRepository.find({
            where: {
                challenge: { id: challengeId },
                status: InvitationStatus.ACCEPTED
            },
            relations: ["receiver"]
        })
         return invitations.map(inv => inv.receiver);
    }













    
}