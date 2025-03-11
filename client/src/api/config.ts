import axios from "axios";

export const API_URL = "http://localhost:3000/api";

// Create a configured axios instance with common settings
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// apiClient.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem('authToken');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
