import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress } from "@mui/material";
import StudySessionDetails from "./StudySessionDetails";
import CommentSection from "./CommentSection";
import { apiBaseUrl } from "../../utils/basePath";
import { useUser } from "../../hooks/useUser";

const StudySessionPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useUser();

  const fetchSession = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBaseUrl}/api/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok) {
        setSession(result);
        setError(null);
      } else {
        setError(result.message || "Failed to fetch session.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching session.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  return (
    <Container sx={{ my: 2 }}>
      {loading && <CircularProgress />}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {session && (
        <>
          <StudySessionDetails
            session={session}
            token={token}
            onUpdate={fetchSession}
          />
          <CommentSection token={token} />
        </>
      )}
    </Container>
  );
};

export default StudySessionPage;
