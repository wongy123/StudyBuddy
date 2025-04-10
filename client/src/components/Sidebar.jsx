import { Drawer, Toolbar, Box, Typography } from "@mui/material";
import NavList from "./ui/NavList";
import UpcomingEventsList from "./ui/UpcomingEventsList";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 300;

const Sidebar = () => {
  const theme = useTheme();
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
            bgcolor: theme.palette.sidebar.main,
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
