import { Request, Response } from "express";
import { TrainingRoomService } from "../services/trainingRoom.service";
import { RoomStatus } from "../entities/TrainingRoom";

const trainingRoomService = new TrainingRoomService();

export class TrainingRoomController {
  createRoom = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const room = await trainingRoomService.createTrainingRoom(
        req.body,
        user.email
      );
      const response = {
        ...room,
        owner: room.owner ? { id: room.owner.id } : null,
      };
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  assignRoom = async (req: Request, res: Response) => {
    try {
      const roomId = Number(req.params.id);
      const userEmail = req.query.userEmail as string;
      const room = await trainingRoomService.assignTrainingRoom(roomId, userEmail);
      res.json(room);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getRooms = async (req: Request, res: Response) => {
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

  getRoomById = async (req: Request, res: Response) => {
    try {
      const room = await trainingRoomService.getTrainingRoomByIdOut(
        Number(req.params.id)
      );
      res.json(room);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  updateRoom = async (req: Request, res: Response) => {
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

  approveRoom = async (req: Request, res: Response) => {
    try {
      const room = await trainingRoomService.approveTrainingRoom(
        Number(req.params.id)
      );
      res.json(room);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  rejectRoom = async (req: Request, res: Response) => {
    try {
      const room = await trainingRoomService.rejectTrainingRoom(
        Number(req.params.id)
      );
      res.json(room);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteRoom = async (req: Request, res: Response) => {
    try {
      await trainingRoomService.deleteTrainingRoom(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
