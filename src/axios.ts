import axios from "axios";
import env from "./util/validateEnv";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${env.TMDB_API_KEY}`,
  },
});

export default instance;
