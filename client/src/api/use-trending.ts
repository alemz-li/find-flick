import axios from "./axios";
import { TrendingMovie } from "../../../src/types/types";
import { useQuery } from "@tanstack/react-query";

export function useTrending() {
  const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
    const { data } = await axios.get(`/tmdb/trending?time=day`);
    return data;
  };

  return useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingMovies,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
