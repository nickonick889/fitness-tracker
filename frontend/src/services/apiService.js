import { getToken } from "./authService";

const BASE_URL = "http://localhost:3000";

const request = async (url, method = "GET", body = null) => {
  const token = getToken();

  const headers = {};

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${url}`, options);

  const data = await res.json().catch(() => null);

  // 🔥 HANDLE AUTH FIRST
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  // 🔥 THEN GENERAL ERROR
  if (!res.ok) {
    throw new Error(data?.error || "Request failed");
  }

  return data;
};

export { request };