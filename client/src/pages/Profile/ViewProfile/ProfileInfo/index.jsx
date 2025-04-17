import { useState } from 'react';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

const ProfileInfo = ({ user, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(user); // local update

  const handleStartEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleSave = async (formData) => {
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }

      // Update local user state and exit edit mode
      setCurrentUser(result.data);
      setIsEditing(false);
    } catch (err) {
      alert(err.message); // Optionally replace with a snackbar
    }
  };

  return isEditing && isEditable ? (
    <EditProfile user={currentUser} onSave={handleSave} onCancel={handleCancelEdit} />
  ) : (
    <ViewProfile user={currentUser} isEditable={isEditable} onEditClick={handleStartEdit} />
  );
};

export default ProfileInfo;
