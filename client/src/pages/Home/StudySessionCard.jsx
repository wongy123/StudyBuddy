import { Paper, Typography } from '@mui/material';

const StudySessionCard = ({ title, description }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

export default StudySessionCard;
