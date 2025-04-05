import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LoginButton = ({ children = 'Login', variant = 'contained', ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate('/login', {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Button variant={variant} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

export default LoginButton;
