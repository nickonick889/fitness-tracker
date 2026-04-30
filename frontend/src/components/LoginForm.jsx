import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { login } from "../services/authService";


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
      const data = await login(formData);
      
      setUser(data.user);

      navigate("/"); // or wherever
    } catch (err) {
      setMessage(err.message || "Invalid login");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6, minHeight: "80vh" }}>
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

            <Stack spacing={2}>
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

              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  No account?
                </Typography>

                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate("/users/new")}
                  sx={{
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}