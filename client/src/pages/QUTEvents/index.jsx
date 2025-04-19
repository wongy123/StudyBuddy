import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Skeleton,
  Alert,
  Container,
} from "@mui/material";
import EventCard from "./EventCard";
import { apiBaseUrl } from "../../utils/basePath";

const QUTEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/qut-events`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "Failed to load events");

        setEvents(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return (
      <Container sx={{ my: 2 }}>
        <Typography variant="h4" gutterBottom>
          🎓 Upcoming QUT Events
        </Typography>
        <Box>
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={250}
              sx={{ mb: 2 }}
            />
          ))}
        </Box>
      </Container>
    );
  if (error)
    return (
      <Container sx={{ my: 2 }}>
        <Box>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );

  return (
    <Container sx={{ my: 2 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          🎓 Upcoming QUT Events
        </Typography>
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid key={event.id} xs={12}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default QUTEventsPage;
