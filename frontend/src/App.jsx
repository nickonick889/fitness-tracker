// src/App.jsx

import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Secret from "./components/Secret";
import SignupForm from "./components/SignInForm";
import { UserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Calendar from "./pages/CalendarPage";

const App = () => {
  //? store the logged in UserID
  // const [user, setUser] = useState();
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return (
      <>
        <h1>
          Fitness-tracker for Aloysious handsome, Jia rui Handsome, Nicholas
          Handsome
        </h1>
        <Navbar />
        <Routes>
          <Route path="/users/new" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/secret" element={<Secret />} />
          <Route path="/Workouts" element={<h1>Workouts</h1>} />
          <Route path="/Logging" element={<h1>Logging</h1>} />
          <Route path="/History" element={<h1>History</h1>} />
          <Route path="/Calendar" element={<Calendar />} />
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
      <h1>Private</h1>
      <button onClick={handleSignOut}>Sign out</button>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/secret" element={<Secret />} />
      </Routes>
    </>
  );
};

export default App;
