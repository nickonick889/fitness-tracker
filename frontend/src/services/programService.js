// For Program + Day Controller
import { request } from "./apiService";

const createProgram = (userId) =>
  request(`/api/program/${userId}`, "POST");

const deleteProgram = (programId) =>
  request(`/api/program/${programId}`, "DELETE");

const addDay = (programId, data) =>
  request(`/api/day/${programId}`, "POST", data);

export { createProgram, deleteProgram, addDay };