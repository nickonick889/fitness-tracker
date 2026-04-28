
import { request } from "./apiService";

const getSession = () => {
  return request("/api/session"); 
};

export { getSession };