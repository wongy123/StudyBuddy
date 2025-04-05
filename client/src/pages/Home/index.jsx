import { Box, Typography, Paper, Container } from '@mui/material';
import { studySessions } from './data';
import StudySessionCard from './StudySessionCard';

const HomePage = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h4" gutterBottom>
        🏫 All Study Sessions
        </Typography>
        { studySessions.map(session => (
          <StudySessionCard key={session.id} {...session} />
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
