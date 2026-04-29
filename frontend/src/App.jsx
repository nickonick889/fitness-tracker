import { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignUpForm";

import HomePage from "./pages/HomePage";
import WorkoutPage from "./pages/WorkoutPage";
import BuildProgramPage from "./pages/BuildProgramPage";
import ProgramPage from "./pages/ProgramPage";
import SessionPage from "./pages/SessionPage";
import Calendar from "./pages/CalendarPage";

import Typography from "@mui/material/Typography";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // 🔥 logout
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* 🔹 HEADER */}
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mt: 3, color: "#eaff00" }}
      >
        FITNESS TRACKER
      </Typography>

      {/* 🔹 NAVBAR */}
      <Navbar />

      {/* 🔹 SHOW LOGOUT ONLY IF USER EXISTS */}
      {user && (
        <div style={{ textAlign: "center", margin: "10px" }}>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}

      {/* 🔹 ROUTES */}
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/new" element={<SignupForm />} />

        {/* App pages (Protected Routes) */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/workouts" element={<ProtectedRoute><WorkoutPage /></ProtectedRoute>} />
        <Route path="/workouts/new" element={<ProtectedRoute><BuildProgramPage /></ProtectedRoute>} />
        <Route path="/programs/:programId" element={<ProtectedRoute><ProgramPage /></ProtectedRoute>} />
        <Route path="/session" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />

        {/* fallback */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;