import { User } from './entities/User'; // Adapte le chemin selon l'emplacement de ton entité User

declare global {
  namespace Express {
    interface Request {
      user: User; 
    }
  }
}
