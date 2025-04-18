import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Typography, Box, Skeleton, Container } from "@mui/material";
import { profileOwnerOrAdmin } from "./profileUtils";
import ViewProfile from "./ViewProfile";

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);   // Reset loading state when ID changes
    setUser(null);      // Optional: clear old user to avoid flashing stale content
    setError(null);     // Optional: clear old error
  
    (async () => {
      try {
        const res = await fetch(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "User not found");
        setUser(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4, px: 3 }}>
          <Skeleton variant="rectangular" height={300} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box>
          <Alert severity="error">{error}</Alert>
          <Typography variant="h5" sx={{ mt: 2 }}>
            🚫 Oops! We couldn't find that user.
          </Typography>
        </Box>
      </Container>
    );
  }

  const isEditable = user._id && profileOwnerOrAdmin(user._id, token);

  return (
    <Container>
        <ViewProfile user={user} isEditable={isEditable} token={token}/>
    </Container>
  );
};

export default ProfilePage;
