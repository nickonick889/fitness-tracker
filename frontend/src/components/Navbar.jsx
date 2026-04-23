import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
// import logo from "../assets/logo.png";


export default function Navbar() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Workouts", path: "/workouts" },
    { label: "Logging", path: "/logging" },
    { label: "Calendar", path: "/calendar" },
  ];

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
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        {/* Center container */}
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
            <NavLink key={item.path} to={item.path} style={{ textDecoration: "none" }}>
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
      </Toolbar>
    </AppBar>
  );
}
