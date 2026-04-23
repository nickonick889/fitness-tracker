import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import theme from "./theme.js";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
     <UserProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <App />
        </ThemeProvider>
     </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
