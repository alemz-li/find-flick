import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "http://192.168.0.20:5000/api",
});
