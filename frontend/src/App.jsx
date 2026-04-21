// src/App.jsx

import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Secret from "./components/Secret";
import SignupForm from "./components/SignInForm";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  //? store the logged in UserID
  // const [user, setUser] = useState();
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return (
      <>
        <h1>Public Aloysious handsome</h1>

        <Routes>
          <Route path="/users/new" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/secret" element={<Secret />} />
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
