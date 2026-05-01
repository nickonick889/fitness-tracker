import { request } from "./apiService";

const createProgram = (userId) =>
  request(`/api/programs/${userId}/addProgram`, "POST");

const deleteProgram = (programId) =>
  request(`/api/programs/${programId}`, "DELETE");

const addDay = (programId, data) =>
  request(`/api/day/${programId}`, "POST", data);

const getPrograms = () =>
  request(`/api/programs`, "GET");

export { createProgram, deleteProgram, addDay, getPrograms };