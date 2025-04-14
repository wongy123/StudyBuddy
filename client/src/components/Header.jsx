import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AuthButton from './ui/AuthButton';
import ThemeToggle from './ui/ThemeToggle';

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    📚 Study Buddy
                </Typography>
                <ThemeToggle/>
                <AuthButton />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
