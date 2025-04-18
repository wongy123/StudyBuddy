import {
  Drawer,
  Toolbar,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavList from "./ui/NavList";
import UpcomingEventsList from "./ui/UpcomingEventsList";
import ThemeToggle from "./ui/ThemeToggle";
import AuthButton from "./ui/AuthButton";
import { getUserFromToken } from "../utils/getUserFromToken";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 300;

const Sidebar = ({ isTemporary = false, drawerOpen, toggleDrawer }) => {
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const { id: userId, displayName } = getUserFromToken(token);

  return (
    <Drawer
      variant={isTemporary ? "temporary" : "permanent"}
      open={isTemporary ? drawerOpen : true}
      onClose={isTemporary ? toggleDrawer : undefined}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: isTemporary ? undefined : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: theme.palette.sidebar.main,
          overflow: "auto",
          backgroundImage: "none",
        },
      }}
    >
      <Toolbar />

      {/* Only show close button + auth stuff in mobile drawer */}
      {isTemporary && (
        <Box sx={{ m: 1 }}>
          <Box display="flex" justifyContent="space-between">
            <ThemeToggle />
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              mb: 1,
              mx: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {token && (
              <Typography variant="body1" sx={{ my: 1 }}>
                Welcome, {displayName}
              </Typography>
            )}
            <Box
              onClick={(e) => {
                // Close sidebar only if it's temporary and the click is on an interactive element
                if (
                  isTemporary &&
                  e.target.closest('button, a, [role="button"]')
                ) {
                  toggleDrawer();
                }
              }}
            >
              <AuthButton variant="outlined" />
            </Box>
          </Box>
        </Box>
      )}
      <Divider />
      <Box
        onClick={(e) => {
          // Close sidebar only if it's temporary and the click is on an interactive element
          if (isTemporary && e.target.closest('button, a, [role="button"]')) {
            toggleDrawer();
          }
        }}
      >
        <NavList />
        <Divider />
        <UpcomingEventsList token={token} userId={userId} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
