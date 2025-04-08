import { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import StudySessionCard from './StudySessionCard';

const HomePage = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/sessions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setSessions(result.data.sessions);
      } else {
        setError(result.message || 'Failed to fetch study sessions.');
      }
    } catch (err) {
      setError('Something went wrong while fetching sessions.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="h4" gutterBottom>
          🏫 All Study Sessions
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {sessions.map((session) => (
          <StudySessionCard key={session._id} {...session} onJoinSuccess={fetchSessions} />
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
