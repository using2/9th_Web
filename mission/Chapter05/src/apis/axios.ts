import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/keys";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
        delete config.headers.Authorization;
    }
    return config;
});
