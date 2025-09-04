import axios from "axios";
import useAuthStore from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const skipAuthEndpoints = ["/auth/sendOtp", "/auth/verifyOtp",];
    const shouldSkip = skipAuthEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );


    const token = useAuthStore.getState().token;
    console.log("Token in store:", token); 

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
      useAuthStore.getState().clearToken();
      console.warn("Token expired. Cleared from storage.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;




// import axios from "axios";
// import useAuthStore from "../store/authStore";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true",
//   },
// });

// // Attach token before each request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // console.log("Token in store:", useAuthStore.getState().token);
//     const token = useAuthStore.getState().token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;
