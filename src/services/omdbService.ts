import OMDB_KEY from "@/store/keys/omdbKey";
import axios from "axios";

const API_URL = `http://www.omdbapi.com/`;

const omdbService = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

omdbService.interceptors.request.use((config) => {
  config.params["apiKey"] = OMDB_KEY;
  return config;
});

export default omdbService;
