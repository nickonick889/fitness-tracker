import { request } from "./apiService";

const createProgram = (userId) =>
  request(`/api/programs/${userId}/addProgram`, "POST");

const deleteProgram = (programId) =>
  request(`/api/programs/${programId}`, "DELETE");

const addDay = (programId, data) =>
  request(`/api/day/${programId}`, "POST", data);

export { createProgram, deleteProgram, addDay };