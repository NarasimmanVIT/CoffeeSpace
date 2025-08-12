import axios from "axios";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://5517f94c5931.ngrok-free.app/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor - Add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token
      useAuthStore.getState().clearToken();

      // Show toast message
      toast.error("Session expired. Please login again.", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/get-started";
      }, 2600);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
