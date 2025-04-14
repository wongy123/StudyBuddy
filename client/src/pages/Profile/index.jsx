import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, Typography, Box, Skeleton} from '@mui/material';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setUser(result.data);
        setError(null);
      } else {
        setError(result.message || 'User not found');
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ mt: 4, px: 3 }}>
        <Skeleton variant='rectangular' height={300} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, px: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Typography variant="h5" sx={{ mt: 2 }}>
          🚫 Oops! We couldn't find that user.
        </Typography>
      </Box>
    );
  }

  return <div>{user.displayName}</div>;
};

export default ProfilePage;
