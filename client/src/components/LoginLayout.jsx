import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';


const LoginLayout = () => {

    return (
        <>
            <Header />
            <Toolbar />
            <Box
                sx={{
                    display: 'flex',
                    height: `calc(100vh - 64px)`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#f0f2f5',
                    overflow: 'hidden',
                }}
            >
                <Outlet />
            </Box>
        </>



    );
};

export default LoginLayout;
