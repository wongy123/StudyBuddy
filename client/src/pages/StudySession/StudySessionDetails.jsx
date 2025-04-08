import {
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/getUserFromToken";

const StudySessionDetails = ({
  title,
  description,
  courseCode,
  date,
  startTime,
  endTime,
  location,
  createdBy,
  participants,
  onJoinSuccess,
}) => {
  const { sessionId } = useParams();
  const token = localStorage.getItem("token");
  const { id: userId, role: userRole } = getUserFromToken(token);

  const isParticipant = participants.some(
    (p) => String(p._id) === String(userId)
  );
  const isOwner = String(createdBy._id) === String(userId);
  const isModmin = userRole === "admin" || userRole === "moderator";

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleJoinOrLeave = async () => {
    const action = isParticipant ? "leave" : "join"; // move this up
    setLoading(true);
    try {
      const res = await fetch(`/api/sessions/${sessionId}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setSnackMessage(
          `Successfully ${action === "join" ? "joined" : "left"} the session!`
        );
        setSnackSeverity("success");
        setSnackOpen(true);
        if (onJoinSuccess) onJoinSuccess(); // trigger parent refresh
      } else {
        setSnackMessage(result.message || `Failed to ${action} the session.`);
        setSnackSeverity("error");
        setSnackOpen(true);
      }
    } catch (err) {
      console.error(err);
      setSnackMessage("Something went wrong while processing your request.");
      setSnackSeverity("error");
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSnackMessage("Session deleted.");
        setSnackSeverity("success");
        setSnackOpen(true);
        setTimeout(() => navigate("/"), 1500); // redirect home
      } else {
        const result = await res.json();
        setSnackMessage(result.message || "Failed to delete session.");
        setSnackSeverity("error");
        setSnackOpen(true);
      }
    } catch (err) {
      console.error(err);
      setSnackMessage("Something went wrong while deleting.");
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          📘 {courseCode}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              📅 Date
            </Typography>
            <Typography>{formatDate(date)}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              🕐 Time
            </Typography>
            <Typography>
              {startTime} - {endTime}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              📍 Location
            </Typography>
            <Typography>{location}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          🎓 Created by
        </Typography>
        <Typography sx={{ mb: 1 }}>{createdBy.displayName}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          👥 Participants ({participants.length})
        </Typography>
        {participants.map((p) => (
          <Typography key={p._id} sx={{ ml: 1 }}>
            💻 {p.displayName}
          </Typography>
        ))}

        <Divider sx={{ my: 2 }} />

        <Button
          variant="contained"
          color={isParticipant ? "error" : "primary"}
          onClick={handleJoinOrLeave}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {isParticipant ? "Leave" : "Join"}
        </Button>
        {(isOwner || isModmin) && (
          <Button
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </Paper>

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
    </>
  );
};

export default StudySessionDetails;
