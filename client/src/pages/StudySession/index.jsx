import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import StudySessionDetails from './StudySessionDetails';
import { Container } from '@mui/material';

const StudySessionPage = () => {
  const { sessionId } = useParams();

  return (
    <Container>
      <StudySessionDetails sessionId={sessionId} />
      <CommentList sessionId={sessionId} />
    </Container>
  );
};

export default StudySessionPage;
