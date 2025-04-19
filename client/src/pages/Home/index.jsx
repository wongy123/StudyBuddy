import { useEffect, useState } from "react";
import { Box, Typography, Container, Button, Stack, Alert } from "@mui/material";
import StudySessionCard from "./StudySessionCard";
import { apiBaseUrl } from "../../utils/basePath";
import LoginPrompt from "./LoginPrompt";
import SessionControls from "./SessionControls";

const HomePage = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); //asc for soonest, desc for latest

  const fetchSessions = async (pageNum = 1) => {
    try {
      const res = await fetch(
        `${apiBaseUrl}/api/sessions?page=${pageNum}&limit=${limit}&search=${encodeURIComponent(
          searchQuery
        )}&sort=${sortOrder}`
      );

      const result = await res.json();

      if (res.ok) {
        setSessions(result.data); // assuming result.data is the array
        setPage(result.page || 1);
        setTotalPages(result.totalPages || 1);
      } else {
        setError(result.message || "Failed to fetch study sessions.");
      }
    } catch (err) {
      setError("Something went wrong while fetching sessions.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions(page);
  }, [page, searchQuery, sortOrder, limit]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <Container sx={{ my: 2 }}>
      <LoginPrompt />
      <Box>
        <SessionControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          limit={limit}
          setLimit={setLimit}
        />

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {sessions.length === 0 && 
        <Alert severity="info" variant="outlined" sx={{ alignItems: "center" }} ><Typography variant="body1">No Sessions Found</Typography></Alert>
        }

        {sessions.map((session) => (
          <StudySessionCard
            key={session._id}
            {...session}
            onJoinSuccess={() => fetchSessions(page)}
          />
        ))}

        {totalPages > 1 && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={handlePrev} disabled={page === 1}>
              <Typography variant="body1">Previous</Typography>
            </Button>
            <Typography variant="body1">
              Page {page} of {totalPages}
            </Typography>
            <Button onClick={handleNext} disabled={page === totalPages}>
              <Typography variant="body1">Next</Typography>
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
