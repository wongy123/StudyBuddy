import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Typography, Skeleton, Container, Box } from "@mui/material";
import { profileOwnerOrAdmin } from "./profileUtils";
import ViewProfile from "./ViewProfile";
import { apiBaseUrl } from "../../utils/basePath";

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true); // Reset loading state when ID changes
    setUser(null); // Optional: clear old user to avoid flashing stale content
    setError(null); // Optional: clear old error

    (async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/users/${id}`, {
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
      <Container sx={{ my: 2 }}>
        <Box>
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={250}
              sx={{ mb: 2 }}
            />
          ))}
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ my: 2 }}>
        <Alert severity="error">{error}</Alert>
        <Typography variant="h5" sx={{ my: 2 }}>
          🚫 Oops! We couldn't find that user.
        </Typography>
      </Container>
    );
  }

  const isEditable = user._id && profileOwnerOrAdmin(user._id, token);

  return (
    <Container sx={{ my: 2 }}>
      <ViewProfile user={user} isEditable={isEditable} token={token} />
    </Container>
  );
};

export default ProfilePage;
