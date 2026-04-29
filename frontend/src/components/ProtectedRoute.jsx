import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  // Not logged in (no token), navigate to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in, access to wrapped children pages (see App.jsx)
  return children;
}