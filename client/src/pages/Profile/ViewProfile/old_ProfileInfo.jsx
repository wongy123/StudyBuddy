import { Box, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfileInfo = ({ user, isEditable }) => {
  const { _id, displayName, userName, degree, profileBio } = user;

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Header: name, handle, edit button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {displayName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @{userName}
          </Typography>
        </Box>

        {isEditable && (
          <Button
            variant="outlined"
            size="small"
            component={Link}
            to={`/profile/${_id}/edit`}
          >
            Edit
          </Button>
        )}
      </Box>

      {/* Degree */}
      <Box>
        <Typography variant="body2" color="text.secondary">
          Degree
        </Typography>
        <Typography variant="body1">{degree}</Typography>
      </Box>

      {/* Bio */}
      <Box>
        <Typography variant="body2" color="text.secondary">
          Bio
        </Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-line',
            color: profileBio ? 'text.primary' : 'text.secondary',
          }}
        >
          {profileBio || 'This user hasn’t written a bio yet.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
