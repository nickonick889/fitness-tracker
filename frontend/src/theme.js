import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#eaff00",
    },
    background: {
      default: "#070707",
      paper: "#0f0f0f",
    },
  },

  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",

    h4: {
      fontWeight: 800,
      letterSpacing: "0.5px",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;