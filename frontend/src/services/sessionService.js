import { request } from "./apiService";

const startSession = (data) =>
  request("/api/session/start", "POST", data);

const getSessions = () => request("/api/session");

const getSession = (sessionId) =>
  request(`/api/session/${sessionId}`);

const updateSession = (sessionId, exercises) =>
  request(`/api/session/${sessionId}`, "PUT", { exercises });

const endSession = (sessionId) =>
  request(`/api/session/${sessionId}/end`, "PUT");

export { startSession, getSessions, getSession, updateSession, endSession };