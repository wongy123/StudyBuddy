import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const AuthButton = ({ variant = 'contained', ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setToken } = useAuth();

  const handleLogin = () => {
    navigate('/login', {
      state: { backgroundLocation: location },
    });
  };

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <Button
      variant={variant}
      onClick={isAuthenticated ? handleLogout : handleLogin}
      {...props}
    >
      {isAuthenticated ? 'Log Out' : 'Login'}
    </Button>
  );
};

export default AuthButton;
