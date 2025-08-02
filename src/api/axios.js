// src/api/axios.js
import axios from "axios";
console.log("VITE_API_BASE_URL =", import.meta.env.VITE_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default axiosInstance;
