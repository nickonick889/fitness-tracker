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
import Template from "./pages/TemplatePage";
import HistoryPage from "./pages/HistoryPage";


import Typography from "@mui/material/Typography";

const App = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Routes>
        //Public Routes
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/new" element={<SignupForm />} />

        // Protected Routes
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/workouts" element={<ProtectedRoute><WorkoutPage /></ProtectedRoute>} />
        <Route path="/programs/:programId" element={<ProtectedRoute><ProgramPage /></ProtectedRoute>} />
        <Route path="/programs/:programId/days/:dayId" element={<ProtectedRoute><DayPage /></ProtectedRoute>} />
        <Route path="/session/:sessionId" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/templates" element={<ProtectedRoute><Template /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

        
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
