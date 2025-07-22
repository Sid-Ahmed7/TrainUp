import AppDataSource from "../config/db";
import { TrainingRoom, RoomStatus } from "../entities/TrainingRoom";
import { CreateTrainingRoomDTO } from "../DTO/TrainingRoom/CreateTrainingRoom.dto";
import { UpdateTrainingRoomDTO } from "../DTO/TrainingRoom/UpdateTrainingRoom.dto";
import { User } from "../entities/User";
import { UpdateTrainingRoomOutDTO } from "../DTO/TrainingRoom/UpdateTrainingRoomOut.dto";
const trainingRoomRepository = AppDataSource.getRepository(TrainingRoom);
const userRepository = AppDataSource.getRepository(User);

export const createTrainingRoom = async (
  roomData: CreateTrainingRoomDTO,
  ownerEmail: string
) => {
  const owner = await userRepository.findOne({ where: { email: ownerEmail } });
  if (!owner) {
    throw new Error("Propriétaire introuvable");
  }

  const room = trainingRoomRepository.create({
    ...roomData,
    owner: owner,
    status: RoomStatus.PENDING,
  });

  return await trainingRoomRepository.save(room);
};

export const getTrainingRooms = async (status?: RoomStatus) => {
  const where = status ? { status } : {};
  return await trainingRoomRepository.find({
    where,
    relations: ["owner"],
  });
};

export const getTrainingRoomById = async (id: number) => {
  const room = await trainingRoomRepository.findOne({
    where: { id },
    relations: ["owner"],
  });

  if (!room) {
    throw new Error("Salle introuvable");
  }

  return room;
};

export const updateTrainingRoom = async (
  id: number,
  roomData: UpdateTrainingRoomDTO,
  userId: number,
  userRole: string
) => {
  const room = await getTrainingRoomById(id);

  // Vérifier les permissions
  if (userRole !== "SUPER_ADMIN" && room.ownerId !== userId) {
    throw new Error("Accès refusé");
  }

  Object.assign(room, roomData);
  const updatedRoom = await trainingRoomRepository.save(room);

  // Retourner le DTO mappé (sans owner)
  return mapToUpdateOutDTO(updatedRoom);
};

export const approveTrainingRoom = async (id: number) => {
  const room = await getTrainingRoomById(id);
  room.status = RoomStatus.APPROVED;
  return await trainingRoomRepository.save(room);
};

export const rejectTrainingRoom = async (id: number) => {
  const room = await getTrainingRoomById(id);
  room.status = RoomStatus.REJECTED;
  return await trainingRoomRepository.save(room);
};

export const deleteTrainingRoom = async (id: number) => {
  const room = await getTrainingRoomById(id);
  await trainingRoomRepository.remove(room);
};

const mapToUpdateOutDTO = (room: TrainingRoom): UpdateTrainingRoomOutDTO => {
  return {
    id: room.id,
    name: room.name,
    address: room.address,
    description: room.description,
    capacity: room.capacity,
    equipment: room.equipment,
    activities: room.activities,
    status: room.status,
    phone: room.phone,
    email: room.email,
    website: room.website,
    ownerId: room.ownerId,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
  };
};
