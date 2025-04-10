import { useState } from 'react';

export const useJoinOrLeaveSession = ({ sessionId, isParticipant, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleJoinOrLeave = async () => {
    const token = localStorage.getItem('token');
    const action = isParticipant ? 'leave' : 'join';
    setLoading(true);

    try {
      const res = await fetch(`/api/sessions/${sessionId}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setSnack({
          open: true,
          message: `Successfully ${action === 'join' ? 'joined' : 'left'} the session!`,
          severity: 'success',
        });
        if (onSuccess) onSuccess();
      } else {
        setSnack({
          open: true,
          message: result.message || `Failed to ${action} the session.`,
          severity: 'error',
        });
      }
    } catch (err) {
      console.error(err);
      setSnack({
        open: true,
        message: 'Something went wrong while processing your request.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const closeSnack = () => setSnack((prev) => ({ ...prev, open: false }));

  return {
    handleJoinOrLeave,
    loading,
    snack,
    closeSnack,
  };
};
