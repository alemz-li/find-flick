import axios from "./axios";
import { MovieInfo } from "../../../src/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { generateRandomNumber } from "../util";

export function useRandomMovie() {
  const queryClient = useQueryClient();

  const getRandomMovie = async (): Promise<MovieInfo> => {
    queryClient.setQueryData(["random"], null);

    const { id } = queryClient.getQueryData(["count"]) as { id: number };

    const randomId = generateRandomNumber(id);
    const { data } = await axios.get(`/tmdb/movie/${randomId}`);
    return data;
  };

  return useQuery({
    queryKey: ["random"],
    queryFn: getRandomMovie,
    enabled: false,
    retry: true,
  });
}
