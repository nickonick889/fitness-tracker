import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { login } from "../services/authService";

export default function LoginForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formData;
    const user = await login(username, password);
    setUser(user);
    if (user) {
      navigate("/secret");
    } else {
      setMessage("Oops!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>LoginForm</legend>

        <label>
          Username:{" "}
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button>Login</button>
        <p>{message}</p>
      </fieldset>
    </form>
  );
}
