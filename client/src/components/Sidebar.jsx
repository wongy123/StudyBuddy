import { Drawer, Toolbar, Box, Typography } from "@mui/material";
import JoinedEvent from "./ui/JoinedEvent";

const drawerWidth = 300;

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar />
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" noWrap component="div" sx={{ mb: 2 }}>
                    📅 Upcoming Events
                </Typography>
                <JoinedEvent />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
