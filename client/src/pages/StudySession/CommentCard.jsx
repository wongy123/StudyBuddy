import { Paper, Box, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import DisplayNameUserName from '../../components/common/DisplayNameUserName';

const CommentCard = ({ user, createdAt, content }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <DisplayNameUserName displayName={user.displayName} userName={user.userName} id={user._id}  />
        <Typography variant="caption" color="text.secondary">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Typography>
      </Box>
      <Typography variant="body1">
        {content}
      </Typography>
    </Paper>
  );
};

export default CommentCard;
