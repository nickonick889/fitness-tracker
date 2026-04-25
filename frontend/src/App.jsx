// src/App.jsx

import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Secret from "./components/Secret";
import SignupForm from "./components/SignInForm";
import { UserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Typography from "@mui/material/Typography";
import Calendar from "./pages/CalendarPage";
import WorkoutPage from "./pages/WorkoutPage";
import ProgramPage from "./pages/ProgramPage";
import BuildProgramPage from "./pages/BuildProgramPage";
import HomePage from "./pages/HomePage";

const App = () => {
  //? store the logged in UserID
  // const [user, setUser] = useState();
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return (
      <>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mt: 3, color: "#eaff00" }}
        >
          FITNESS TRACKER
        </Typography>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/new" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/secret" element={<Secret />} />
          <Route path="/workouts" element={<WorkoutPage />} />
          <Route path="/workouts/new" element={<BuildProgramPage />} />
          <Route path="/programs/:programId" element={<ProgramPage />} />
          <Route path="/logging" element={<h1>Logging</h1>} />
          <Route path="/history" element={<h1>History</h1>} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </>
    );
  }

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mt: 3, color: "#eaff00" }}
      >
        FITNESS TRACKER
      </Typography>
      <Navbar />
      <button onClick={handleSignOut}>Sign out</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/workouts" element={<WorkoutPage />} />
        <Route path="/workouts/new" element={<BuildProgramPage />} />
        <Route path="/programs/:programId" element={<ProgramPage />} />
        <Route path="/logging" element={<h1>Logging</h1>} />
        <Route path="/history" element={<h1>History</h1>} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  );
};

export default App;
