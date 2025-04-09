import { Container, Typography } from '@mui/material';
import CreateSessionForm from './CreateSessionForm';

const CreateSessionPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        📅 Create a New Study Session
      </Typography>
      <CreateSessionForm />
    </Container>
  );
};

export default CreateSessionPage;
