import { Button, CircularProgress } from '@mui/material';
import { useJoinOrLeaveSession } from '../hooks/useJoinOrLeaveSession';

const JoinLeaveButton = ({ sessionId, isParticipant, onSuccess }) => {
  const {
    handleJoinOrLeave,
    loading,
    snack, // optional: if you want to forward Snackbar to parent
    closeSnack,
  } = useJoinOrLeaveSession({ sessionId, isParticipant, onSuccess });

  return (
    <Button
      variant="contained"
      color={isParticipant ? "error" : "primary"}
      onClick={handleJoinOrLeave}
      disabled={loading}
      startIcon={loading && <CircularProgress size={20} color="inherit" />}
    >
      {isParticipant ? 'Leave' : 'Join'}
    </Button>
  );
};

export default JoinLeaveButton;