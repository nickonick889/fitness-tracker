import { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/new" element={<SignupForm />} />

        {/* App pages (no frontend protection) */}
        <Route path="/workouts" element={<WorkoutPage />} />
        <Route path="/workouts/new" element={<BuildProgramPage />} />
        <Route path="/programs/:programId" element={<ProgramPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/calendar" element={<Calendar />} />

        {/* fallback */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;