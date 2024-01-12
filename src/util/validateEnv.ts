import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  TMDB_API_KEY: str(),
  PORT: port(),
});
