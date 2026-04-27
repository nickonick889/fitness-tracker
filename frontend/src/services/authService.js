const BASE_URL = "http://localhost:3000";

const signup = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Signup failed");
  }

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

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Login failed")
  }
  return data;
}

export { signup, login }