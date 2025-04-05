import { Paper, Typography, TextField, Button } from '@mui/material';

const LoginPage = () => {
    return (
        <Paper elevation={6} sx={{ p: 4, width: 400 }}>
            <Typography variant="h5" mb={2}>Login to StudyBuddy</Typography>
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Password" type="password" margin="normal" />
            <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                Login
            </Button>
        </Paper>
    );
};

export default LoginPage;
