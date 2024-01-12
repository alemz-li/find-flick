import { useQuery } from "@tanstack/react-query";
import axios from "./axios";
import { MovieId } from "../../../src/types/types";

export function useCount() {
  const getCount = async (): Promise<MovieId> => {
    const response = await axios.get("/tmdb/latest");
    return response.data;
  };

  return useQuery({
    queryKey: ["count"],
    queryFn: getCount,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
