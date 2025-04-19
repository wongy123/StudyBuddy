import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const AuthButton = ({ variant = "contained", ...props }) => {
  const navigate = useNavigate();
  const { isAuthenticated, setToken } = useAuth();

  const handleLogin = () => {
    navigate("/login", {});
  };

  const handleLogout = () => {
    setToken(null);
    window.location.href = "/";
  };

  return (
    <Button
      variant={variant}
      onClick={isAuthenticated ? handleLogout : handleLogin}
      {...props}
      color="secondary"
    >
      {isAuthenticated ? "Log Out" : "Login"}
    </Button>
  );
};

export default AuthButton;
