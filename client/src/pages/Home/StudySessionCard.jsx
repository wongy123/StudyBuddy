import {
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { useJoinOrLeaveSession } from "../../hooks/useJoinOrLeaveSession";
import { useSidebarRefresh } from "../../context/SidebarRefreshContext";
import DisplayNameUserName from "../../components/common/DisplayNameUserName";
import { useUser } from "../../hooks/useUser";

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
  const { triggerRefresh } = useSidebarRefresh();

  const sessionId = _id;
  const { token, user } = useUser();
  const { id: userId } = user;
  const isParticipant = participants.some(
    (p) => String(p._id) === String(userId)
  );

  const { handleJoinOrLeave, loading, snack, closeSnack } =
    useJoinOrLeaveSession({
      sessionId,
      isParticipant,
      onSuccess: () => {
        if (onJoinSuccess) onJoinSuccess();
        triggerRefresh();
      },
    });

  return (
    <>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={3}>
          <Grid size={8}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1" color="text.secondary">
              📘 {courseCode}
            </Typography>
          </Grid>

          <Grid size={4}>
            <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
              🎓 Created by:
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <DisplayNameUserName
                displayName={createdBy.displayName}
                userName={createdBy.userName}
                id={createdBy._id}
              />
            </Box>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Typography variant="body1">
              {description.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" color="text.secondary">
                  📅 Date: {formatDate(date)}
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" color="text.secondary">
                  🕐 {startTime} - {endTime}
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" color="text.secondary">
                  📍 Location: {location}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1" color="text.secondary">
              👥 Participants: {participants.length}
            </Typography>
          </Grid>
          {token && (
            <Grid size={12}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => navigate(`/session/${_id}`)}
              >
                View
              </Button>

              <Button
                variant="contained"
                color={isParticipant ? "error" : "primary"}
                onClick={handleJoinOrLeave}
                disabled={loading}
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                {isParticipant ? "Leave" : "Join"}
              </Button>
            </Grid>
          )}
        </Grid>
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
    </>
  );
};

export default StudySessionCard;
