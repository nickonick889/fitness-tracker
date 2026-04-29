import { request } from "./apiService";

const getExercises = () =>
  request("/api/exercises/all");

export { getExercises };