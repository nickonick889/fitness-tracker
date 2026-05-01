import { request } from "./apiService";

const startSession = (data) =>
  request("/api/session/start", "POST", data);

const getSessions = () =>
  request(`/api/session`, "GET");

const getSession = (sessionId) =>
  request(`/api/session/${sessionId}`);

const updateSession = (sessionId, exercises) =>
  request(`/api/session/${sessionId}`, "PUT", { exercises });

const endSession = (sessionId) =>
  request(`/api/session/${sessionId}/end`, "PUT");

const deleteSession = (id) =>
  request(`/api/session/${id}`, "DELETE");

export { getSessions, startSession, getSession, updateSession, endSession, deleteSession };