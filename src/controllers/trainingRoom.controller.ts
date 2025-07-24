import { Request, Response } from "express";
import { TrainingRoomService } from "../services/TrainingRoom.service";
import { RoomStatus } from "../entities/TrainingRoom";
import { AppError } from "../utils/AppError";

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
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la création d'une salle d'entraînement" });
      return
    }
  };

  assignRoom = async (req: Request, res: Response) => {
    try {
      const { roomId, userId } = req.body;
      const room = await trainingRoomService.assignTrainingRoom(roomId, userId);
      res.json(room);
    } catch (error: any) {
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la l'assignation d'une salle d'entraînement" });
      return
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
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la récupération des salles d'entraînements" });
      return
    }
  };

  getRoomById = async (req: Request, res: Response) => {
    try {
      const room = await trainingRoomService.getTrainingRoomByIdOut(
        Number(req.params.id)
      );
      res.json(room);
    } catch (error: any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la récupération d'une salle d'entraînement" });
      return
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
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la mise à jour d'une salle d'entraînement" });
      return
    }
  };

  approveRoom = async (req: Request, res: Response) => {
    try {
      const room = await trainingRoomService.approveTrainingRoom(
        Number(req.params.id)
      );
      res.json(room);
    } catch (error: any) {
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de l'approbation de la salle d'entraînement" });
      return
    }
  };

  rejectRoom = async (req: Request, res: Response) => {
    try {
      const room = await trainingRoomService.rejectTrainingRoom(
        Number(req.params.id)
      );
      res.json(room);
    } catch (error: any) {
       if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors du rejet de la salle d'entraînement" });
      return
    }
  };

  deleteRoom = async (req: Request, res: Response) => {
    try {
      await trainingRoomService.deleteTrainingRoom(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      if(error instanceof AppError) {
        res.status(error.status).json({error: error.message})
        return
      }
      res.status(500).json({ error: "Erreur lors de la suppression d'une salle d'entrainement" });
      return
    }
  };
}
