import axios from "axios";
import { axiosInterceptor } from "./axiosInterceptor";

const baseURL = "https://api.dev.sheroganj.ir/api";
export const axiosInstance = axios.create({
  baseURL,
});

axiosInterceptor(axiosInstance);
