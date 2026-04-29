import { request } from "./apiService";

const createProgram = (userId) =>
  request(`/api/program/${userId}/addProgram`, "POST");

const deleteProgram = (programId) =>
  request(`/api/program/${programId}`, "DELETE");

const addDay = (programId, data) =>
  request(`/api/day/${programId}`, "POST", data);

export { createProgram, deleteProgram, addDay };