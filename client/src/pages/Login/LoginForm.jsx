import { useState } from 'react';
import { useNavigate, useLocation, data } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const backgroundLocation = location.state?.backgroundLocation || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            setToken(data.token);
            navigate(backgroundLocation);
        } else {
            setError(data.message || 'Login failed');
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Paper sx={{ p: 4, width: 400 }}>
                <Typography variant="h5" gutterBottom>Login to StudyBuddy</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error}
                        helperText={!!error ? '' : ''}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        helperText={!!error ? error : ''}
                    />
                    <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                message="Login failed. Please check your credentials."
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    autoHideDuration={2000}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Login failed. Please check your credentials.
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginForm;