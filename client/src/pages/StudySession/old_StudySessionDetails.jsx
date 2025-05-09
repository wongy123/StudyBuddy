import {
  Typography,
  Paper,
  Divider,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { useParams, useNavigate } from "react-router-dom";
import { useJoinOrLeaveSession } from "../../hooks/useJoinOrLeaveSession";
import { useSidebarRefresh } from "../../context/SidebarRefreshContext";
import DisplayNameUserName from "../../components/common/DisplayNameUserName";
import { apiBaseUrl } from "../../utils/basePath";
import { useUser } from "../../hooks/useUser";

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
  const { token, user } = useUser();
  const { id: userId, role: userRole } = user;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      const res = await fetch(`${apiBaseUrl}/api/sessions/${sessionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setDeleteSnackMessage("Session deleted. Redirecting...");
        setDeleteSnackSeverity("success");
        setDeleteSnackOpen(true);
        triggerRefresh();
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

        <Box
          component="session-details"
          sx={{
            display: "inline-flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 1, md: 2 },
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              📅 Date
            </Typography>
            <Typography>{formatDate(date)}</Typography>
          </Box>

          {!isMobile && (
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          )}

          <Box>
            <Typography variant="body2" color="text.secondary">
              🕐 Time
            </Typography>
            <Typography>
              {startTime} - {endTime}
            </Typography>
          </Box>

          {!isMobile && (
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          )}

          <Box>
            <Typography variant="body2" color="text.secondary">
              📍 Location
            </Typography>
            <Typography>{location}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          🎓 Created by
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="body2" component="span" sx={{ mr: 1 }}>
            👑
          </Typography>
          <DisplayNameUserName
            displayName={createdBy.displayName}
            userName={createdBy.userName}
            id={createdBy._id}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          👥 Participants ({participants.length})
        </Typography>
        {participants.map((p) => (
          <Box key={p._id} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" component="span" sx={{ mr: 1 }}>
              💻
            </Typography>
            <DisplayNameUserName
              displayName={p.displayName}
              userName={p.userName}
              id={p._id}
            />
          </Box>
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
