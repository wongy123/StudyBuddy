import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import StudySessionDetails from "./StudySessionDetails";
import CommentSection from "./CommentSection";
import { apiBaseUrl } from "../../utils/basePath";

const StudySessionPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const fetchSession = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setSession(result);
      } else {
        setError(result.message || "Failed to fetch session.");
      }
    } catch (err) {
      setError("Something went wrong while fetching the session.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  return (
    <Container>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {session ? (
        <>
          <StudySessionDetails {...session} onJoinSuccess={fetchSession} />
          <CommentSection />
        </>
      ) : (
        !error && <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default StudySessionPage;
