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
    throw new Error(data.error || "Login failed")
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

const secret = async () => {
  const url = `${BASE_URL}/login/secret`;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export { login, signup, getToken, logout, secret };