// services/templateService.js
import { request } from "./apiService";

const createTemplate = (data) =>
  request("/api/template", "POST", data);

const seedTemplate = () =>
  request("/api/template/seed", "POST");

export { createTemplate, seedTemplate };