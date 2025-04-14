import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import AuthButton from "./ui/AuthButton";
import ThemeToggle from "./ui/ThemeToggle";
import { getUserFromToken } from "../utils/getUserFromToken";

const Header = () => {
  const token = localStorage.getItem("token");
  const user = getUserFromToken(token);
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          📚 Study Buddy
        </Typography>
        <ThemeToggle />
        {/* Swap Welcome message and Register button */}
        {token? (
          <Typography variant="body1" sx={{ mx: 1 }}>
            Welcome, {user.displayName}
          </Typography>
        ): 
        <Button variant="outlined" color="inherit" href="/register" sx={{mx: 1}}>Register</Button> 
        }
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
