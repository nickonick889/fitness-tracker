import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignUpForm";

import HomePage from "./pages/HomePage";
import WorkoutPage from "./pages/WorkoutPage";
import ProgramPage from "./pages/ProgramPage";
import SessionPage from "./pages/SessionPage";
import Calendar from "./pages/CalendarPage";
import DayPage from "./pages/DayPage";

import Typography from "@mui/material/Typography";

const App = () => {
  const { user, setUser } = useContext(UserContext); //it's not used, not sure if you guys will use it later

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/new" element={<SignupForm />} />

        {/* App pages (Protected Routes) */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/workouts" element={<ProtectedRoute><WorkoutPage /></ProtectedRoute>} />
        <Route path="/programs/:programId" element={<ProtectedRoute><ProgramPage /></ProtectedRoute>} />
        <Route path="/programs/:programId/days/:dayId" element={<ProtectedRoute><DayPage /></ProtectedRoute>} />
        <Route path="/session" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />

        
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
