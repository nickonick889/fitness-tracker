import { request } from "./apiService";

const startSession = (data) =>
  request("/api/session/start", "POST", data);

const getSession = (sessionId) =>
  request(`/api/session/${sessionId}`);

const updateSession = (sessionId, exercises) =>
  request(`/api/session/${sessionId}`, "PUT", { exercises });

const endSession = (sessionId) =>
  request(`/api/session/${sessionId}/end`, "PUT");

export { startSession, getSession, updateSession, endSession };