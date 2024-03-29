import "dotenv/config";
import express, { Request, Response } from "express";
import morgan from "morgan";
import tmdbRoutes from "./routes/tmdb.routes";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/tmdb", tmdbRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
