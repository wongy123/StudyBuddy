import { Box, TextField, Typography } from '@mui/material';

const ProfileForm = ({ formData, onChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Display Name
        </Typography>
        <TextField
          fullWidth
          value={formData.displayName}
          onChange={onChange('displayName')}
          variant="outlined"
        />
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary">
          Degree
        </Typography>
        <TextField
          fullWidth
          value={formData.degree}
          onChange={onChange('degree')}
          variant="outlined"
        />
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary">
          Bio
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          value={formData.profileBio}
          onChange={onChange('profileBio')}
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default ProfileForm;
