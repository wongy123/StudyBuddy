import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import LoginButton from './ui/LoginButton';

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    📚 Study Buddy
                </Typography>
                <LoginButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
