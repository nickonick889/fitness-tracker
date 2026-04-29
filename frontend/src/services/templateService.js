import { request } from "./apiService";

const createTemplate = (data) =>
  request("/api/template/create", "POST", data);

const seedTemplate = () =>
  request("/api/template/seed", "POST");

export { createTemplate, seedTemplate };