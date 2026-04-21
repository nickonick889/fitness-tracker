const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`;

export async function login(username, password) {
  const url = `${BASE_URL}/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    if (result.token) {
      localStorage.setItem("token", result.token);
      return JSON.parse(atob(result.token.split(".")[1])).user;
      // return JSON.parse(atob(result.token.split(".")[1])).payload;
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error);
  }
}

export async function secret() {
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
