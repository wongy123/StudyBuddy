import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from '@mui/icons-material/School';
import { getUserFromToken } from "../../utils/getUserFromToken";
import { Link } from "react-router-dom";

const NavList = () => {
  const token = localStorage.getItem("token");
  const user = getUserFromToken(token);
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="View All Sessions" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to={`/qut-events`}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="QUT Events" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/create-session">
          <ListItemIcon>
            <EditCalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Create Session" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to={`/profile/${user.id}`}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="My profile" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default NavList;
