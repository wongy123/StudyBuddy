import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { SidebarRefreshProvider } from "./context/SidebarRefreshContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SidebarRefreshProvider>
          <App />
        </SidebarRefreshProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
