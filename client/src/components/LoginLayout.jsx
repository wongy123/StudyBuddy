import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';


const LoginLayout = () => {
    const appBarHeight = 64;

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: appBarHeight,
                    left: 0,
                    width: '100vw',
                    height: `calc(100vh - ${appBarHeight}px)`,
                    zIndex: 1300,
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Outlet />
            </Box>
        </>

    );
};

export default LoginLayout;
