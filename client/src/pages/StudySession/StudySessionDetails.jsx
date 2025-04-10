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
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { useParams, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/getUserFromToken";
import { useJoinOrLeaveSession } from "../../hooks/useJoinOrLeaveSession";
import { useSidebarRefresh } from "../../context/SidebarRefreshContext";

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

  const navigate = useNavigate();
  const { triggerRefresh } = useSidebarRefresh();

  const [deleteSnackOpen, setDeleteSnackOpen] = useState(false);
  const [deleteSnackMessage, setDeleteSnackMessage] = useState("");
  const [deleteSnackSeverity, setDeleteSnackSeverity] = useState("success");

  const { handleJoinOrLeave, loading, snack, closeSnack } =
    useJoinOrLeaveSession({
      sessionId,
      isParticipant,
      onSuccess: () => {
        if (onJoinSuccess) onJoinSuccess();
        triggerRefresh();
      },
    });

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
        setDeleteSnackMessage("Session deleted. Redirecting...");
        setDeleteSnackSeverity("success");
        setDeleteSnackOpen(true);
        setTimeout(() => navigate("/"), 1500); // redirect home
      } else {
        const result = await res.json();
        setDeleteSnackMessage(result.message || "Failed to delete session.");
        setDeleteSnackSeverity("error");
        setDeleteSnackOpen(true);
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
        open={snack.open}
        autoHideDuration={2000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnack} severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSnackOpen}
        autoHideDuration={2000}
        onClose={() => setDeleteSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setDeleteSnackOpen(false)}
          severity={deleteSnackSeverity}
          variant="filled"
        >
          {deleteSnackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StudySessionDetails;
