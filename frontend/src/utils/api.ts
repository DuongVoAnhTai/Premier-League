import axios, { AxiosInstance } from "axios";
import { getToken } from "./localStorage";

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;