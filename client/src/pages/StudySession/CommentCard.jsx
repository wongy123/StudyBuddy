import { Paper, Box, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const CommentCard = ({ user, createdAt, content }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      {/* Header row: name + date */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight="bold">
          {user.displayName} <Typography variant="body2" component="span" color="text.secondary">(@{user.userName})</Typography>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Typography>
      </Box>

      {/* Comment body */}
      <Typography variant="body1">
        {content}
      </Typography>
    </Paper>
  );
};

export default CommentCard;
