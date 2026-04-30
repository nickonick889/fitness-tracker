import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
// import logo from "../assets/logo.png";
import { getToken, logout } from "../services/authService";

export default function Navbar() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Workouts", path: "/workouts" },
    { label: "Session", path: "/session" },
    { label: "Calendar", path: "/calendar" },
  ];

  const token = getToken();

  const handleLogout = () => {
    logout(); // remove token
    window.location.href = "/login"; // redirect
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(10,10,10,0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(234,255,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", minHeight: 64 }}>
        
        <Box sx={{ width: 120 }} />

        <Typography
          variant="h4"
          sx={{ 
            fontWeight: 800,
            color: "#eaff00",
            letterSpacing: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
           }}
        >
          FITNESS TRACKER
        </Typography>

        
        <Box sx={{ 
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          }}>
          {token && (
            <Button
              onClick={handleLogout}
              sx={{
                color: "#eaff00",
                border: "1px solid rgba(234,255,0,0.3)",
                borderRadius: "999px",
                textTransform: "none",
                px: 2,
                "&:hover": {
                  background: "rgba(234,255,0,0.08)",
                },
              }}
            >
              Sign Out
            </Button>
          )}
        </Box>        
      </Toolbar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: "rgba(255,255,255,0.03)",
            padding: "6px 12px",
            borderRadius: "999px",
            border: "1px solid rgba(234,255,0,0.15)",
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Button
                  sx={{
                    color: isActive ? "#eaff00" : "#aaa",
                    fontWeight: 600,
                    borderRadius: "999px",
                    px: 2,
                    textTransform: "none",
                    transition: "0.2s",
                    background: isActive
                      ? "rgba(234,255,0,0.08)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 0 12px rgba(234,255,0,0.25)"
                      : "none",
                    "&:hover": {
                      background: "rgba(234,255,0,0.08)",
                      color: "#eaff00",
                    },
                  }}
                >
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
}
