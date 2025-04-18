import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ThemeModeProvider } from "./context/ThemeContext";

import { AuthProvider } from "./context/AuthContext";
import { SidebarRefreshProvider } from "./context/SidebarRefreshContext";
import { basePath } from "./utils/basePath.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <AuthProvider>
        <SidebarRefreshProvider>
          <ThemeModeProvider>
            <App />
          </ThemeModeProvider>
        </SidebarRefreshProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
