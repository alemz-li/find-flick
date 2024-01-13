import "dotenv/config";
import express, { Request, Response } from "express";
import morgan from "morgan";
import tmdbRoutes from "./routes/tmdb.routes";
import cors from "cors";
import helmet from "helmet";
import { join } from "path";

const app = express();

app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "https://image.tmdb.org"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: [
          "'self'",
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
        ],
      },
    },
  }),
);
app.use(cors());
app.use(express.json());

// Frontend
app.use(express.static(join(__dirname, "../client/dist")));

app.use("/api/tmdb", tmdbRoutes);

app.all("*", (_req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
