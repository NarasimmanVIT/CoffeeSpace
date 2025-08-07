import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com', // replace with actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;