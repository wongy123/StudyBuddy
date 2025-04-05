import { Box } from '@mui/material';
import LoginForm from './LoginForm';

const LoginPage = () => {
    return (
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <LoginForm />
        </Box>
    );
};

export default LoginPage;
