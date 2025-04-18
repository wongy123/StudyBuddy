// src/components/DefaultLayout.jsx
import { Outlet } from "react-router-dom";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const DefaultLayout = () => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Header mobileView={lgDown} toggleDrawer={toggleDrawer} />

      {!lgDown && <Sidebar />}

      {/* Main Content on the right */}
      <Box
        component="main"
        sx={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}
      >
        <Toolbar /> {/* Spacer to align with AppBar */}
        <Outlet />
      </Box>

      {/* Sidebar Drawer for mobile (will be rendered in Sidebar.jsx) */}
      {lgDown && (
        <Sidebar
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          isTemporary
        />
      )}
    </Box>
  );
};

export default DefaultLayout;
