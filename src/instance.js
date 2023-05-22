import axios from "axios";
import config from "./config/devconfig";

console.log("config: ", config);
const instance = axios.create({
  baseURL: config.apiUrl,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
