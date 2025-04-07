import { Box } from '@mui/material';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
    return (
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <RegisterForm />
        </Box>
    );
};

export default RegisterPage;
