const BASE_URL = "http://localhost:3000";

const signup = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Signup failed");
  }

  localStorage.setItem("token", data.token);

  return data;
}

const login = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Login failed")
  }

  localStorage.setItem("token", data.token);

  return data;
}

// Get Token (For future requests to protected routes)
const getToken = () => {
  return localStorage.getItem("token");
};

// Logout
const logout = () => {
  localStorage.removeItem("token");
};


export { login, signup, getToken, logout};