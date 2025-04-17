import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import ProfileForm from './ProfileForm';

const EditProfile = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    degree: user.degree,
    profileBio: user.profileBio || '',
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // Call the parent save function with the updated data
    await onSave(formData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ProfileForm formData={formData} onChange={handleChange} />

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default EditProfile;
