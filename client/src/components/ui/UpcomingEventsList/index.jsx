import { Box, Typography } from '@mui/material';
import JoinedEvent from './JoinedEvent';
import { useEffect, useState } from 'react';
import { getUserFromToken } from '../../../utils/getUserFromToken';
import { useSidebarRefresh } from '../../../context/SidebarRefreshContext';

const UpcomingEventsList = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [error, setError] = useState(null);
  const { id: userId } = getUserFromToken(localStorage.getItem('token'));
  const { refreshKey } = useSidebarRefresh();

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const res = await fetch('/api/sessions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const result = await res.json();
        if (res.ok) {
          const sessions = result.data;
          const filtered = sessions.filter((s) =>
            s.participants.some((p) => String(p._id) === String(userId))
          );
          setJoinedEvents(filtered);
        } else {
          setError(result.message || 'Failed to fetch sessions');
        }
      } catch (err) {
        setError('Something went wrong');
        console.error(err);
      }
    };

    fetchJoinedEvents();
  }, [userId, refreshKey]);

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Typography variant="h6" noWrap component="div" sx={{ mb: 2 }}>
      🔮 Upcoming Events
      </Typography>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      {joinedEvents.length === 0 && !error ? (
        <Typography variant="body2" color="text.secondary">
          No upcoming events.
        </Typography>
      ) : (
        joinedEvents.map((event) => (
          <Box key={event._id} sx={{ mb: 2 }}>
            <JoinedEvent {...event} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default UpcomingEventsList;
