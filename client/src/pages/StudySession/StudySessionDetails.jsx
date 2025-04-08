import { Typography, Grid, Paper, Divider, Button, Snackbar, Alert } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const StudySessionDetails = ({ title, description, courseCode, date, startTime, endTime, location, createdBy, participants, onJoinSuccess }) => {
  const { sessionId } = useParams();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');
  const handleJoin = async () => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setSnackMessage('Successfully joined the session!');
        setSnackSeverity('success');
        setSnackOpen(true);
        if (onJoinSuccess) onJoinSuccess(); // 🔁 trigger parent refresh
      } else {
        setSnackMessage(result.message || 'Failed to join the session.');
        setSnackSeverity('error');
        setSnackOpen(true);
      }
    } catch (err) {
      console.error(err);
      setSnackMessage('Something went wrong while joining the session.');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };
  return (
    <>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          📘 {courseCode}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">📅 Date</Typography>
            <Typography>{formatDate(date)}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">🕐 Time</Typography>
            <Typography>{startTime} - {endTime}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">📍 Location</Typography>
            <Typography>{location}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          🎓 Created by
        </Typography>
        <Typography sx={{ mb: 1 }}>{createdBy.displayName}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          👥 Participants ({participants.length})
        </Typography>
        {participants.map((p) => (
          <Typography key={p.userName} sx={{ ml: 1 }}>
            💻 {p.displayName}
          </Typography>
        ))}
        <Divider sx={{ my: 2 }} />

        <Button variant="contained" color="primary" onClick={handleJoin}>
          Join
        </Button>
      </Paper>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert autoHideDuration={2000} onClose={() => setSnackOpen(false)} severity={snackSeverity} variant="filled">
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default StudySessionDetails;