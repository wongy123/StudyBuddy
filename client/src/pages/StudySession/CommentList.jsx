import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import { apiBaseUrl } from "../../utils/basePath";

const CommentList = ({ token }) => {
  const { sessionId } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${apiBaseUrl}/api/sessions/${sessionId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (res.ok) {
        setComments(result.data.comments);
      } else {
        setError(result.message || "Failed to load comments.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching comments.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [sessionId]);

  const handleDelete = async (commentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${apiBaseUrl}/api/sessions/${sessionId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await res.text(); // ✅ only read once
      const result = text ? JSON.parse(text) : {};

      if (res.ok) {
        setSnackMessage(result.message || "Comment deleted.");
        setSnackSeverity("success");
        fetchComments();
      } else {
        setSnackMessage(result.message || "Failed to delete comment.");
        setSnackSeverity("error");
      }
    } catch (err) {
      console.error(err);
      setSnackMessage("Error deleting comment.");
      setSnackSeverity("error");
    } finally {
      setSnackOpen(true);
    }
  };

  const handleUpdate = async (commentId, updatedContent) => {
    try {
      const res = await fetch(
        `${apiBaseUrl}/api/sessions/${sessionId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: updatedContent }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setSnackMessage("Comment updated.");
        setSnackSeverity("success");
        fetchComments(); // Refresh
      } else {
        setSnackMessage(result.message || "Failed to update comment.");
        setSnackSeverity("error");
      }
    } catch (err) {
      console.error(err);
      setSnackMessage("Error updating comment.");
      setSnackSeverity("error");
    } finally {
      setSnackOpen(true);
    }
  };

  return (
    <Box component="comment-list">
      <Typography variant="h5" sx={{ my: 2 }}>
        💬 Comments
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {comments.length === 0 && !error ? (
        <Typography variant="body1" color="text.secondary">
          No one has commented yet.
        </Typography>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment._id}
            {...comment}
            onDelete={() => handleDelete(comment._id)}
            onUpdate={(updatedContent) => handleUpdate(comment._id, updatedContent)}
          />
        ))
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommentList;
