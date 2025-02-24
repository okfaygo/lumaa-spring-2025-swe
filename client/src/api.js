import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication Endpoints
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);

// Tasks Endpoints (require authentication)
export const getTasks = (token) =>
  api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (taskData, token) =>
  api.post("/tasks", taskData, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = (id, taskData, token) =>
  api.put(`/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = (id, token) =>
  api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default api;
