import { Drawer, Toolbar, Box, Typography } from "@mui/material";
import NavList from "./ui/NavList";
import UpcomingEventsList from "./ui/UpcomingEventsList";
import { useTheme } from "@mui/material/styles";
import { getUserFromToken } from "../utils/getUserFromToken";

const drawerWidth = 300;

const Sidebar = () => {
  const theme = useTheme();
  const token = localStorage.getItem('token');
  const { id: userId } = getUserFromToken(token);

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
        <UpcomingEventsList token={token} userId={userId} />
      </Drawer>
    </>
  );
};

export default Sidebar;
