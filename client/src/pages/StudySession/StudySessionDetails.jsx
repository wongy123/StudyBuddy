import { Typography, Paper } from '@mui/material';

const StudySessionDetails = ({ sessionId }) => {
  // fetch session details here if needed
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5">Study Session #{sessionId}</Typography>
      <Typography variant="body2" color="text.secondary">
        Hosted by Jane Doe • April 5, 2025
      </Typography>
      <Typography sx={{ mt: 2 }}>
        We're reviewing Python recursion problems. Bring your laptops!
      </Typography>
    </Paper>
  );
};

export default StudySessionDetails;
