import axios from "./axios";
import { MovieInfo } from "../../../src/types/types";
import { useQuery } from "@tanstack/react-query";

export function useMovie(id: number) {
  const getMovie = async (): Promise<MovieInfo> => {
    const { data } = await axios.get(`/tmdb/movie/${id}`);
    return data;
  };

  return useQuery({
    queryKey: ["movie", id],
    queryFn: getMovie,
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
