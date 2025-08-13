
import axios from "axios";
import useAuthStore from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: "https://868a7d16a092.ngrok-free.app/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    const skipAuthEndpoints = ["/auth/sendOtp", "/auth/verifyOtp", "/ping"];
    const shouldSkip = skipAuthEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );

    if (token && !shouldSkip) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid → clear it
      useAuthStore.getState().clearToken();
      console.warn("Token expired. Cleared from storage.");
      // Optional: Redirect to login
      // window.location.href = "/get-started";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


