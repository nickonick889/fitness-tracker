// src/contexts/UserContext.jsx

import { createContext, useState } from "react";

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  return JSON.parse(atob(token.split(".")[1])).user;
};

//? React Component
function UserProvider({ children }) {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(getUserFromToken());

  const value = { user, setUser };
  //? A.B -> A is an object
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
