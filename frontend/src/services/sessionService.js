import { request } from "./apiService";

const startSession = (data) =>
  request("/api/session/start", "POST", data);

const endSession = (data) =>
  request("/api/session/end", "POST", data);

export { startSession, endSession };