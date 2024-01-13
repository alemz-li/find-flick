import { Request, Response } from "express";
import { MovieId, TmdbMovieApi, TrendingMovies } from "../types/types.d";
import axios from "../axios";
import { movieInfo } from "../helpers";
import { AxiosError } from "axios";

type IdParam = { id: string };

export const getLatest = async (_req: Request, res: Response) => {
  try {
    const ApiResponse = await axios.get<MovieId>("/movie/latest");
    if (ApiResponse.status !== 200) res.status(204);

    console.log(ApiResponse.status);
    const { data: movie } = ApiResponse;

    res.json({
      id: movie.id,
    });
  } catch (error) {
    if (error instanceof AxiosError)
      res.status(500).json({ message: error?.message });
  }
};

export const getMovieById = async (
  req: Request<IdParam, TmdbMovieApi, unknown>,
  res: Response,
) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Movie ID is required" });
  try {
    const ApiResponse = await axios.get<TmdbMovieApi>(
      `/movie/${req.params.id}?append_to_response=credits`,
    );

    const movie = movieInfo(ApiResponse.data);

    if (movie.adult) throw new Error("NSFW movie found");

    res.json(movie);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(404).json(null);
    } else if (error instanceof Error) {
      return res.status(403).json({ message: error.message });
    }
  }
};

type TimeQuery = { time: string };

export const getTrendingMovies = async (
  req: Request<unknown, TrendingMovies, unknown, TimeQuery>,
  res: Response,
) => {
  try {
    const time = ["week", "day"].includes(req.query.time)
      ? req.query.time
      : "week";

    const ApiResponse = await axios.get<TrendingMovies>(
      `/trending/movie/${time}`,
    );

    res.json(ApiResponse.data.results);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};
