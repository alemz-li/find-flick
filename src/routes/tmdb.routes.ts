import { Router } from "express";
import * as tmdbService from "../services/tmdb.service";

const router = Router();

router.get("/latest", tmdbService.getLatest);
router.get("/movie/:id", tmdbService.getMovieById);
router.get("/trending", tmdbService.getTrendingMovies);

export default router;
