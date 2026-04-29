import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { login } from "../services/authService";
import { getSession } from "../services/sessionService";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";


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
      await login(formData);

      const data = await getSession();

      setUser(data.user);

      navigate("/"); // or wherever
    } catch (err) {
      setMessage(err.message || "Invalid login");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card
        sx={{
          border: "1px solid rgba(234,255,0,0.2)",
          background: "linear-gradient(180deg, #111 0%, #0b0b0b 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                textAlign: "center",
                color: "primary.main",
              }}
            >
              Login
            </Typography>

            {message && <Alert severity="error">{message}</Alert>}

            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              autoComplete="username"
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Sign In
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}