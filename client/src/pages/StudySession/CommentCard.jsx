import { Paper, Box, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow } from 'date-fns';
import DisplayNameUserName from '../../components/common/DisplayNameUserName';
import { useUser } from '../../hooks/useUser';

const CommentCard = ({ user, createdAt, content, onDelete }) => {
  const { user: currentUser } = useUser();
  const isOwner = currentUser?.id === user._id;
  const isModmin = currentUser?.role === 'admin' || currentUser?.role === 'moderator';

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <DisplayNameUserName
          displayName={user.displayName}
          userName={user.userName}
          id={user._id}
        />

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Typography>

          {(isOwner || isModmin) && (
            <Tooltip title="Delete comment">
              <IconButton size="small" onClick={onDelete} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <Typography variant="body1">
        {content}
      </Typography>
    </Paper>
  );
};

export default CommentCard;