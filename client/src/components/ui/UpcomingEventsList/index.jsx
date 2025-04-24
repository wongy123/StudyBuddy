import { Box, Typography, Button, Stack } from "@mui/material";
import JoinedEvent from "./JoinedEvent";
import { useEffect, useState } from "react";
import { useSidebarRefresh } from "../../../context/SidebarRefreshContext";
import { apiBaseUrl } from "../../../utils/basePath";

const UpcomingEventsList = ({
  token,
  userId,
  title = "🔮 Upcoming Events",
}) => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2); //For future extension of set limit
  const { refreshKey } = useSidebarRefresh();

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const res = await fetch(
          `${apiBaseUrl}/api/sessions/joined/${userId}?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();

        if (res.ok) {
          setJoinedEvents(result.data);
          setTotalPages(result.totalPages || 1);
        } else {
          setError(result.message || "Failed to fetch joined sessions");
        }
      } catch (err) {
        setError("Something went wrong");
        console.error(err);
      }
    };

    fetchJoinedEvents();
  }, [page, limit, refreshKey]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Box sx={{ p: 2 }}>
      <Box component="events-list">
        <Typography variant="h6" noWrap component="div" sx={{ mb: 2 }}>
          {title}
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}

        {joinedEvents.length === 0 && !error ? (
          <Typography variant="body2" color="text.secondary">
            No upcoming events.
          </Typography>
        ) : (
          joinedEvents.map((event) => (
            <Box key={event._id} sx={{ mb: 2 }}>
              <JoinedEvent {...event} />
            </Box>
          ))
        )}
      </Box>
      {totalPages > 1 && (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <Button onClick={handlePrev} size="small" disabled={page === 1}>
            Prev
          </Button>
          <Typography variant="body2">
            Page {page} of {totalPages}
          </Typography>
          <Button
            onClick={handleNext}
            size="small"
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default UpcomingEventsList;
