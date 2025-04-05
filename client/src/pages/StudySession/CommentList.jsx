import { Box, Typography } from '@mui/material';
import CommentCard from './CommentCard';

const CommentList = ({ sessionId }) => {
  // Placeholder: you can replace with fetch later
  const comments = [
    { id: 1, author: 'Alice', text: 'Great session last time!' },
    { id: 2, author: 'Bob', text: 'Can we cover binary trees too?' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      {comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </Box>
  );
};

export default CommentList;
