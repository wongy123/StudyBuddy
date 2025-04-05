// src/components/DefaultLayout.jsx
import { Outlet } from 'react-router-dom';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    Toolbar,
    Typography,
} from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const DefaultLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />

            <Header />

            <Sidebar />

            {/* Main Content on the right */}
            <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 3 }}>
                <Toolbar /> {/* Spacer to align with AppBar */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default DefaultLayout;