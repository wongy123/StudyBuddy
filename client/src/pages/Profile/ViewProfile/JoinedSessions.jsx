import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
// import JoinedEvent from '../../../components/ui/UpcomingEventsList/JoinedEvent';
import UpcomingEventsList from '../../../components/ui/UpcomingEventsList';

const JoinedSessions = ({ userId, token }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`/api/sessions/joined/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();

        if (!res.ok) throw new Error(result.message || 'Failed to load sessions');

        const joined = result.data.filter((s) =>
          s.participants.some((p) => String(p._id) === String(userId))
        );

        setSessions(joined);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    // <Box>
    //   <Typography variant="h6" gutterBottom>
    //     👥 Joined Sessions
    //   </Typography>

    //   {sessions.length === 0 ? (
    //     <Typography variant="body2" color="text.secondary">
    //       This user hasn’t joined any sessions yet.
    //     </Typography>
    //   ) : (
    //     <Box display="flex" flexDirection="column" gap={2}>
    //       {sessions.map((session) => (
    //         <JoinedEvent key={session._id} {...session} />
    //       ))}
    //     </Box>
    //   )}
    // </Box>
    <UpcomingEventsList token={token} userId={userId} title="👥 Joined Sessions" />
  );
};

export default JoinedSessions;
