import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { login } from "../services/authService";
import { getSession } from "../services/sessionService";

export default function LoginForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔐 Step 1: login → stores token
      await login(formData);

      // 🔐 Step 2: fetch user from protected route
      const data = await getSession();

      // 🔐 Step 3: set user in context
      setUser(data.user);

      navigate("/dashboard"); // or wherever
    } catch (err) {
      setMessage(err.message || "Invalid login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />
      <button>Login</button>
      <p>{message}</p>
    </form>
  );
}