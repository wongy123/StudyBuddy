import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";

import { AuthProvider } from "./context/AuthContext";
import { SidebarRefreshProvider } from "./context/SidebarRefreshContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <SidebarRefreshProvider>
          <App />
        </SidebarRefreshProvider>
      </AuthProvider>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
