import { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await onSubmit(content);
      setContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handlePost();
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        fullWidth
        multiline
        placeholder="Write your comment here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button
          variant="contained"
          onClick={handlePost}
          disabled={!content.trim() || loading}
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;