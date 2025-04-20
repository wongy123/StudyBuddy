import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import ProfileInfo from './ProfileInfo';
import JoinedSessions from './JoinedSessions';

const ViewProfile = ({ user, isEditable, isOwner, token }) => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMedium ? 'column' : 'row',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      {/* Left: Profile Info (flex-grow) */}
      <Paper
        sx={{
          flexGrow: 1,
          p: 3,
          width: isMedium ? '100%' : 'auto',
          bgcolor: theme.palette.sidebar.main,
        }}
      >
        <ProfileInfo user={user} isEditable={isEditable} isOwner={isOwner} token={token} />
      </Paper>

      {/* Right: Joined Sessions (fixed width) */}
      <Paper
        sx={{
        width: isMedium ? '100%' : 300,
          flexShrink: 0,
          bgcolor: theme.palette.sidebar.main,
        }}
      >
        <JoinedSessions userId={user._id} token={token} />
      </Paper>
    </Box>
  );
};

export default ViewProfile;
