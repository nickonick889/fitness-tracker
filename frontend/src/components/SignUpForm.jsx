import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import { getSession } from "../services/sessionService";
import { UserContext } from "../contexts/UserContext";

export default function SignupForm() {
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
      //  Step 1: signup → token stored (authService handles it)
      await signup(formData);

      //  Step 2: fetch user using token
      const data = await getSession();

      //  Step 3: update global user state
      setUser(data.user);

      //  Step 4: redirect
      navigate("/dashboard");

    } catch (err) {
      console.error(err.message);
      setMessage(err.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Signup</legend>

        <label>
          Username:
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>

        <br />

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <br />

        <button>Sign Up</button>

        <p>{message}</p>
      </fieldset>
    </form>
  );
}