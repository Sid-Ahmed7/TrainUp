import AppDataSource from "../config/db";
import { TrainingRoom, RoomStatus } from "../entities/TrainingRoom";
import { CreateTrainingRoomDTO } from "../DTO/TrainingRoom/CreateTrainingRoom.dto";
import { UpdateTrainingRoomDTO } from "../DTO/TrainingRoom/UpdateTrainingRoom.dto";
import { User } from "../entities/User";
import { UpdateTrainingRoomOutDTO } from "../DTO/TrainingRoom/UpdateTrainingRoomOut.dto";
import { TypeExercice } from "../entities/TypeExercice";
import { Equipment } from "../entities/Equipment";
import { TypeExerciceEquipment } from "../entities/TypeExerciceEquipment";
const trainingRoomRepository = AppDataSource.getRepository(TrainingRoom);
const userRepository = AppDataSource.getRepository(User);
export class TrainingRoomService {
  createTrainingRoom = async (
    roomData: CreateTrainingRoomDTO,
    ownerEmail: string
  ) => {
    const owner = await userRepository.findOne({
      where: { email: ownerEmail },
    });
    if (!owner) {
      throw new Error("Propriétaire introuvable");
    }
    const typeExerciceEquipments = await this.buildTypeExerciceEquipments(
      roomData.typeExerciceEquipments
    );

    const room = trainingRoomRepository.create({
      ...roomData,
      owner,
      typeExerciceEquipments,
      status: RoomStatus.PENDING,
    });

    return await trainingRoomRepository.save(room);
  };

  getTrainingRooms = async (status?: RoomStatus) => {
    const where = status ? { status } : {};
    const rooms = await trainingRoomRepository.find({
      where,
      relations: ["owner"],
    });
    return rooms.map((room) => ({
      ...room,
      owner: room.owner ? { id: room.owner.id } : null,
    }));
  };

  getTrainingRoomByIdOut = async (id: number) => {
    const room = await trainingRoomRepository.findOne({
      where: { id },
      relations: ["owner"],
    });

    if (!room) {
      throw new Error("Salle introuvable");
    }

    return {
      ...room,
      owner: room.owner ? { id: room.owner.id } : null,
    };
  };

  getTrainingRoomById = async (id: number) => {
    const room = await trainingRoomRepository.findOne({
      where: { id },
      relations: ["owner"],
    });

    if (!room) {
      throw new Error("Salle introuvable");
    }

    return room;
  };

  updateTrainingRoom = async (
    id: number,
    roomData: UpdateTrainingRoomDTO,
    userId: string,
    userRole: string
  ) => {
    const room = await this.getTrainingRoomById(id);

    // Vérifier les permissions
    if (userRole !== "SUPER_ADMIN" && room.owner.id !== userId) {
      throw new Error("Accès refusé");
    }

    room.name = roomData.name ?? room.name;
    room.address = roomData.address ?? room.address;
    room.description = roomData.description ?? room.description;
    room.capacity = roomData.capacity ?? room.capacity;
    room.phone = roomData.phone ?? room.phone;
    room.email = roomData.email ?? room.email;
    room.website = roomData.website ?? room.website;

    // Mettre à jour les typeExerciceEquipments si fournis
    if (roomData.typeExerciceEquipments) {
      // supprimer old associations
      await AppDataSource.getRepository(TypeExerciceEquipment).delete({
        trainingRoom: { id: room.id },
      });

      // Recréer new associations
      room.typeExerciceEquipments = await this.buildTypeExerciceEquipments(
        roomData.typeExerciceEquipments,
        room
      );
    }

    const updatedRoom = await trainingRoomRepository.save(room);

    // DTO no User
    return this.mapToUpdateOutDTO(updatedRoom);
  };

  approveTrainingRoom = async (id: number) => {
    const room = await this.getTrainingRoomById(id);
    room.status = RoomStatus.APPROVED;
    return await trainingRoomRepository.save(room);
  };

  rejectTrainingRoom = async (id: number) => {
    const room = await this.getTrainingRoomById(id);
    room.status = RoomStatus.REJECTED;
    return await trainingRoomRepository.save(room);
  };

  deleteTrainingRoom = async (id: number) => {
    const room = await this.getTrainingRoomById(id);
    await trainingRoomRepository.remove(room);
  };
  assignTrainingRoom = async (roomId: number, userId: string) => {
    const room = await this.getTrainingRoomById(roomId);
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error("Utilisateur introuvable");
    }
    if (user.role !== "USER") {
      room.owner = user;
      return await trainingRoomRepository.save(room);
    }
  };

  buildTypeExerciceEquipments = async (
    typeExerciceEquipmentsPayload: {
      exerciceId: number;
      equipmentId?: number;
    }[],
    trainingRoom?: TrainingRoom // optionnel, à passer pour l'update
  ): Promise<TypeExerciceEquipment[]> => {
    const typeExerciceEquipmentRepo = AppDataSource.getRepository(
      TypeExerciceEquipment
    );
    const typeExerciceRepo = AppDataSource.getRepository(TypeExercice);
    const equipmentRepo = AppDataSource.getRepository(Equipment);

    return Promise.all(
      (typeExerciceEquipmentsPayload || []).map(async (e) => {
        const exercice = await typeExerciceRepo.findOneBy({ id: e.exerciceId });
        if (!exercice) throw new Error("Exercice introuvable");

        let equipment: Equipment | undefined = undefined;
        if (e.equipmentId) {
          equipment =
            (await equipmentRepo.findOneBy({ id: e.equipmentId })) || undefined;
          if (!equipment) throw new Error("Équipement introuvable");
        }

        return typeExerciceEquipmentRepo.create({
          exercice,
          equipment,
          ...(trainingRoom ? { trainingRoom } : {}),
        });
      })
    );
  };
  mapToUpdateOutDTO = (room: TrainingRoom): UpdateTrainingRoomOutDTO => {
    return {
      id: room.id,
      name: room.name,
      address: room.address,
      description: room.description,
      capacity: room.capacity,
      typeExerciceEquipments: room.typeExerciceEquipments?.map((e) => ({
        exerciceId: e.exercice.id,
        equipmentId: e.equipment?.id,
      })),
      owner: room.owner,
      status: room.status,
      phone: room.phone,
      email: room.email,
      website: room.website,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  };
}
