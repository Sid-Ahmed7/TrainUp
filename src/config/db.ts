import { config } from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Category } from "../entities/Category";
import { Target } from "../entities/Target";
import { Equipment } from "../entities/Equipment";
import { TypeExercice } from "../entities/TypeExercice";
import { TypeExerciceEquipment } from "../entities/TypeExerciceEquipment";
import { TrainingRoom } from "../entities/TrainingRoom";
import { Badge } from "../entities/Badge";
import { UserBadge } from "../entities/UserBadge";
import { Challenge } from "../entities/Challenge";
import { TrainingSession } from "../entities/TrainingSession";
config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  entities: [
    User,
    Category,
    Target,
    Equipment,
    TypeExercice,
    TypeExerciceEquipment,
    Challenge,
    TrainingSession,
    TrainingRoom,
    Badge,
    UserBadge,
  ],
  synchronize: true,
  /*logging: ["query", "error"],
  logger: "advanced-console",*/
});

export default AppDataSource;
