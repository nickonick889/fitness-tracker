import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <button>Sign Up</button>
      </fieldset>
    </form>
  );
}
