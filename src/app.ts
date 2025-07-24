import express from "express";
import { config } from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import cors from "cors";
import * as routes from "./routes/index";
import AppDataSource from "./config/db";
config({ path: ".env.local" });

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "TrainUp Express API",
      version: "1.0.0",
      description: "API pour projet Node.js",
    },
    servers: [
      {
        url: "http://localhost:" + process.env.PORT,
      },
    ],
  },
  apis: ["./dist/routes/modelsSwagger/*.swagger.js"],
};

app.use(express.json());
app.use(cors(corsOptions));
const specs = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use("/api/auth", routes.authRoutes);
app.use("/api/categorie", routes.categoryRoutes);
app.use("/api/target", routes.targetRoutes);
app.use("/api/exercice", routes.typeExerciceRoutes);
app.use("/api/equipment", routes.equipmentRoutes);
app.use("/api/training-rooms", routes.TraniningRoomRoutes);
app.use("/api/exercice-equipment", routes.typeExerciceEquipmentRoutes);
app.use("/api/challenge", routes.challengeRoutes);
app.use("/api/session", routes.trainingSession);
app.use("/api/badges", routes.badgeRoutes);
app.use("/api/rewards", routes.rewardRoutes);
app.use("/api/invitations", routes.invitationRoutes);

export default app;
export { AppDataSource };
