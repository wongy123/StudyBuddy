import { useState } from "react";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import { apiBaseUrl } from "../../../../utils/basePath";
import { Snackbar, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileInfo = ({ user, isEditable, isOwner, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(user); // local update
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleStartEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);
  const closeSnack = () => setSnack((prev) => ({ ...prev, open: false }));

  const handleSave = async (formData) => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      // Update local user state and exit edit mode
      setCurrentUser(result.data);
      setIsEditing(false);
    } catch (err) {
      alert(err.message); // Optionally replace with a snackbar
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this profile? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${apiBaseUrl}/api/users/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const result = await res.text();
        throw new Error(result || "Failed to delete profile.");
      }

      setSnack({
        open: true,
        message: "Profile deleted.",
        severity: "success",
      });

      setTimeout(() => {
        if (isOwner) {
          localStorage.removeItem("token");
          window.location.href = "/";
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      setSnack({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };

  return isEditing && isEditable ? (
    <EditProfile
      user={currentUser}
      onSave={handleSave}
      onCancel={handleCancelEdit}
    />
  ) : (
    <Box component="profile-info">
      <ViewProfile
        user={currentUser}
        isEditable={isEditable}
        onEditClick={handleStartEdit}
        onDeleteClick={handleDelete}
      />
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

export default ProfileInfo;
