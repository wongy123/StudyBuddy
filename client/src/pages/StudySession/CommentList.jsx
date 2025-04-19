import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { Typography, Box } from "@mui/material";
import { apiBaseUrl } from "../../utils/basePath";

const CommentList = ({ token }) => {
  const { sessionId } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchComments();
  }, [sessionId]);

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
          <CommentCard key={comment._id} {...comment} />
        ))
      )}
    </Box>
  );
};

export default CommentList;
