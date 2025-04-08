import { Typography, Grid, Paper, Divider } from '@mui/material';
import { formatDate } from '../../utils/formatDate';

const StudySessionDetails = ({ title, description, courseCode, date, startTime, endTime, location, createdBy, participants }) => {
  return (
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
          • {p.displayName}
        </Typography>
      ))}
    </Paper>
  );
};
export default StudySessionDetails;