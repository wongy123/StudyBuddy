import { Paper, Typography } from '@mui/material';

const CommentCard = ({ author, text }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {author}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Paper>
  );
};

export default CommentCard;
