import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AuthButton from "./ui/AuthButton";
import ThemeToggle from "./ui/ThemeToggle";
import { getUserFromToken } from "../utils/getUserFromToken";
import { Link } from "react-router-dom";

const Header = ({ mobileView = false, toggleDrawer }) => {
  const token = localStorage.getItem("token");
  const user = getUserFromToken(token);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {mobileView && (
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          📚 Study Buddy
        </Typography>

        {!mobileView && (
          <>
            <ThemeToggle />
            {/* Swap welcome message and register button */}
            {token ? (
              <Typography variant="body1" sx={{ mx: 1 }}>
                Welcome, {user.displayName}
              </Typography>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mx: 1 }}
                component={Link}
                to="/register"
              >
                Register
              </Button>
            )}

            <AuthButton sx={{ml: 1}}/>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
