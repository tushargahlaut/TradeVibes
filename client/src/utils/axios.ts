import axios, { AxiosInstance } from "axios";

//Login, Signup

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

export const BaseAxios = axios.create({
  baseURL: backendUrl,
});

//For Already Logged In User
export const ExtAxios: AxiosInstance = axios.create({
  baseURL: BaseAxios.defaults.baseURL,
});

ExtAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ExtAxios;
