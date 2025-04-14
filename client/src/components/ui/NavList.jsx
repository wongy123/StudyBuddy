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
import { getUserFromToken } from "../../utils/getUserFromToken";

const NavList = () => {
  const token = localStorage.getItem("token");
  const user = getUserFromToken(token);
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="View All Sessions" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton href="/create-session">
          <ListItemIcon>
            <EditCalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Create Session" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton href={`/profile/${user.id}`}>
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
