import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button } from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    displayName: '',
    email: '',
    password: '',
    degree: '',
    profileBio: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, email, password, degree } = formData;
    if (!userName || !email || !password || !degree) {
      setError('Please fill in all required fields.');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      navigate('/login');
    } else {
      setError(data.message || 'Registration failed');
    }
  };

  return (
    <Paper sx={{ p: 4, width: 400 }}>
      <Typography variant="h5" gutterBottom>Create an Account</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" name="userName" margin="normal" value={formData.userName} onChange={handleChange} required/>
        <TextField fullWidth label="Display Name (optional)" name="displayName" margin="normal" value={formData.displayName} onChange={handleChange} />
        <TextField fullWidth label="Email" name="email" margin="normal" value={formData.email} onChange={handleChange} required/>
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" value={formData.password} onChange={handleChange} required/>
        <TextField fullWidth label="Degree" name="degree" margin="normal" value={formData.degree} onChange={handleChange} required/>
        <TextField fullWidth label="Profile Bio (optional)" name="profileBio" margin="normal" value={formData.profileBio} onChange={handleChange} />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>
        )}

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default RegisterForm;
