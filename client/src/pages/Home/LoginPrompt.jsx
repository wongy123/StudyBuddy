import { Alert, Box, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPrompt = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return null;

  return (
    <Box sx={{ my: 1 }}>
      <Alert severity="info" variant="outlined" sx={{ alignItems: "center" }} >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "start", md: "center" },
          }}
        >
          <Typography variant="body1" fontWeight={"bold"} sx={{ mr: 1 }}>
            Want to join a session or create your own?
          </Typography>
          <Typography variant="body1">
            <MuiLink component={Link} to="/login" underline="hover">
              Login
            </MuiLink>{" "}
            /{" "}
            <MuiLink component={Link} to="/register" underline="hover">
              Register
            </MuiLink>{" "}
            to get started
          </Typography>
        </Box>
      </Alert>
    </Box>
  );
};

export default LoginPrompt;
