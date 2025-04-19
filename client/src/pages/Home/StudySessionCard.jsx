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
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const shortDesc =
    description.length > (isMobile ? 50 : 100)
      ? description.slice(0, isMobile ? 50 : 100) + "..."
      : description;

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
    <Box component="study-session-card">
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1" color="text.secondary">
              📘 {courseCode}
            </Typography>
          </Grid>
          {!isMobile && (
            <Grid size={{ md: 4 }}>
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
          )}
          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={12}>
            <Typography variant="body1">{shortDesc}</Typography>
          </Grid>

          <Grid size={12}>
            <Box
              component="session-details"
              sx={{
                display: "inline-flex",
                flexDirection: { xs: "column", md: "row" },
              }}
              gap={1}
            >
              <Typography variant="body1" color="text.secondary">
                📅 Date: {formatDate(date)}
              </Typography>
              {!isMobile && (
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              )}
              <Typography variant="body1" color="text.secondary">
                🕐 {startTime} - {endTime}
              </Typography>
              {!isMobile && (
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              )}
              <Typography variant="body1" color="text.secondary">
                📍 Location: {location}
              </Typography>
            </Box>
          </Grid>

          {isMobile && (
            <Grid size={12}>
              <Divider flexItem />
            </Grid>
          )}

          <Grid size={12}>
            <Typography variant="body1" color="text.secondary">
              👥 Participants: {participants.length}
            </Typography>
            {isMobile && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  my: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
                  🎓 Created by:
                </Typography>
                <DisplayNameUserName
                  displayName={createdBy.displayName}
                  userName={createdBy.userName}
                  id={createdBy._id}
                />
              </Box>
            )}
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
    </Box>
  );
};

export default StudySessionCard;
