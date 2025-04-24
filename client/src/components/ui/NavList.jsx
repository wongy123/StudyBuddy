import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const NavList = () => {
  const { token, user } = useUser();

  return (
    <List component="nav-list">
      <ListItem disablePadding component="nav-item-home">
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="View All Sessions" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding component="nav-item-qut-events">
        <ListItemButton component={Link} to={`/qut-events`}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="QUT Events" />
        </ListItemButton>
      </ListItem>
      {token && (
        <Box component="nav-user-only">
          <ListItem disablePadding component="nav-item-create-session">
            <ListItemButton component={Link} to="/create-session">
              <ListItemIcon>
                <EditCalendarIcon />
              </ListItemIcon>
              <ListItemText primary="Create Session" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component="nav-item-my-profile">
            <ListItemButton component={Link} to={`/profile/${user.id}`}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="My profile" />
            </ListItemButton>
          </ListItem>
          {user?.role === "admin" && (
            <ListItem disablePadding component="nav-item-admin">
              <ListItemButton component={Link} to="/admin">
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItemButton>
            </ListItem>
          )}
        </Box>
      )}
    </List>
  );
};

export default NavList;
