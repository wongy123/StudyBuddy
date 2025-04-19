import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await onSubmit(content);
      setContent("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        inputProps={{ maxLength: 500 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {content.length > 0 && (
                <Box mr={1} textAlign="right">
                  <small
                    style={{ color: content.length >= 500 ? "red" : "inherit" }}
                  >
                    {content.length} / 500
                  </small>
                </Box>
              )}
              <Button
                variant="contained"
                onClick={handlePost}
                disabled={!content.trim() || loading}
                sx={{ minWidth: 80 }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Post"
                )}
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CommentForm;
