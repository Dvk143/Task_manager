import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// GET all tasks
export const fetchTasks = () => API.get("/tasks");

// CREATE task
export const createTask = (data) => API.post("/tasks", data);

// UPDATE task (edit / toggle)
export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

// DELETE task
export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export default API;
