import app from "./app";
import env from "./util/validateEnv";

const PORT = env.PORT || 5000;

try {
  app.listen(PORT, () => console.log("Server running on port " + PORT));
} catch (error) {
  console.log(error);
}
