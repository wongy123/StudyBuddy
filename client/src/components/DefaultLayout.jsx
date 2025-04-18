// src/components/DefaultLayout.jsx
import { Outlet } from "react-router-dom";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DefaultLayout = () => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Header />

      {!lgDown && <Sidebar />}

      {/* Main Content on the right */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, overflowY: "auto", height: "100vh" }}
      >
        <Toolbar /> {/* Spacer to align with AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
