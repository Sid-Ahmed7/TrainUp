import { Request, Response } from "express";
import * as trainingRoomService from "../services/TrainingRoomService";
import { RoomStatus } from "../entities/TrainingRoom";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    console.log(user);
    const room = await trainingRoomService.createTrainingRoom(
      req.body,
      user.email
    );
    res.status(201).json(room);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const rooms = await trainingRoomService.getTrainingRooms(
      status as RoomStatus
    );
    res.json(rooms);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await trainingRoomService.getTrainingRoomById(
      Number(req.params.id)
    );
    res.json(room);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const room = await trainingRoomService.updateTrainingRoom(
      Number(req.params.id),
      req.body,
      user.id,
      user.role
    );
    res.json(room);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const approveRoom = async (req: Request, res: Response) => {
  try {
    const room = await trainingRoomService.approveTrainingRoom(
      Number(req.params.id)
    );
    res.json(room);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const rejectRoom = async (req: Request, res: Response) => {
  try {
    const room = await trainingRoomService.rejectTrainingRoom(
      Number(req.params.id)
    );
    res.json(room);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    await trainingRoomService.deleteTrainingRoom(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
