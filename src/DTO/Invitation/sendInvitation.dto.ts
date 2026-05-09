import { Expose } from "class-transformer";

export class SendInvitationDTO {

    @Expose()
    receiverId!: string

    @Expose()
    challengeId!: number
}