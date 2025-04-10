import { Drawer, Toolbar, Box, Typography } from "@mui/material";
import NavList from "./ui/NavList";
import UpcomingEventsList from "./ui/UpcomingEventsList";

const drawerWidth = 300;

const Sidebar = () => {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <NavList />
        <UpcomingEventsList />
      </Drawer>
    </>
  );
};

export default Sidebar;
