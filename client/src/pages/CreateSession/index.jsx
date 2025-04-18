import { Container, Typography } from "@mui/material";
import CreateSessionForm from "./CreateSessionForm";

const CreateSessionPage = () => {
  return (
    <Container maxWidth="sm" sx={{ my: 2 }}>
      <Typography variant="h4" gutterBottom>
        📅 Create a New Study Session
      </Typography>
      <CreateSessionForm />
    </Container>
  );
};

export default CreateSessionPage;
