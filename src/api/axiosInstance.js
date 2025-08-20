import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://d8b96bb1ab3c.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;