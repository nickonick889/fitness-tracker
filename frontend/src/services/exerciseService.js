// services/exerciseService.js
import { request } from "./apiService";

const getExercises = () =>
  request("/api/exercises");

export { getExercises };