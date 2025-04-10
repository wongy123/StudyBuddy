import {
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";

const StudySessionCard = ({
  title,
  description,
  courseCode,
  date,
  startTime,
  endTime,
  location,
  createdBy,
  participants,
  _id,
  onJoinSuccess,
}) => {
  const navigate = useNavigate();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const handleJoin = async () => {
    try {
      const res = await fetch(`/api/sessions/${_id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setSnackMessage("Successfully joined the session!");
        setSnackSeverity("success");
        setSnackOpen(true);
        if (onJoinSuccess) onJoinSuccess(); // 🔁 trigger parent refresh
      } else {
        setSnackMessage(result.message || "Failed to join the session.");
        setSnackSeverity("error");
        setSnackOpen(true);
      }
    } catch (err) {
      console.error(err);
      setSnackMessage("Something went wrong while joining the session.");
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={3}>
          <Grid size={8} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" fontWeight="bold">
              {title}
            </Typography>
          </Grid>

          <Grid size={4}>
            <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
              🎓 Created by:
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                component="span"
              >
                {createdBy.displayName}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                color="text.secondary"
              >
                {" "}
                (@{createdBy.userName})
              </Typography>
            </Box>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Typography variant="h6">📘 {courseCode}</Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1">
              {description.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1">
              📅 Date: {formatDate(date)} | 🕐 {startTime} - {endTime} | 📍
              Location: {location}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1">
              👥 Participants: {participants.length}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mr: 1 }}
              onClick={() => navigate(`/session/${_id}`)}
            >
              View
            </Button>
            <Button variant="contained" color="primary" onClick={handleJoin}>
              Join
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          autoHideDuration={2000}
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StudySessionCard;
