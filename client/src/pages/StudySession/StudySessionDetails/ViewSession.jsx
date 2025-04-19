import {
  Typography,
  Divider,
  Button,
  CircularProgress,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { useJoinOrLeaveSession } from "../../../hooks/useJoinOrLeaveSession";
import { useSidebarRefresh } from "../../../context/SidebarRefreshContext";
import DisplayNameUserName from "../../../components/common/DisplayNameUserName";
import { useUser } from "../../../hooks/useUser";
import { apiBaseUrl } from "../../../utils/basePath";
import { useState } from "react";

const ViewSession = ({ session, setMode, onJoinSuccess, token }) => {
  const { user } = useUser();
  const { id: userId, role: userRole } = user;
  const {
    _id: sessionId,
    title,
    description,
    courseCode,
    date,
    startTime,
    endTime,
    location,
    createdBy,
    participants,
  } = session;

  const isParticipant = participants.some(
    (p) => String(p._id) === String(userId)
  );
  const isOwner = String(createdBy._id) === String(userId);
  const isModmin = userRole === "admin" || userRole === "moderator";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { triggerRefresh } = useSidebarRefresh();
  const [loading, setLoading] = useState(false);

  const { handleJoinOrLeave } = useJoinOrLeaveSession({
    sessionId,
    isParticipant,
    onSuccess: () => {
      if (onJoinSuccess) onJoinSuccess();
      triggerRefresh();
    },
  });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      setLoading(true);
      const res = await fetch(`${apiBaseUrl}/api/sessions/${sessionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        triggerRefresh();
        navigate("/");
      } else {
        const result = await res.json();
        alert(result.message || "Failed to delete session.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
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

        {!isMobile && <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />}

        <Box>
          <Typography variant="body2" color="text.secondary">
            🕐 Time
          </Typography>
          <Typography>
            {startTime} - {endTime}
          </Typography>
        </Box>

        {!isMobile && <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />}

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
        <>
          <Button
            variant="outlined"
            color="primary"
            sx={{ ml: 2 }}
            onClick={() => setMode("edit")}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </>
      )}
    </Box>
  );
};

export default ViewSession;
