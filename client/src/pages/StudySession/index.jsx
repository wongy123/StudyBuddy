import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import StudySessionDetails from './StudySessionDetails';
import { Container } from '@mui/material';
import { studySessions } from '../Home/data'; // Assuming this is the correct path to your data

const StudySessionPage = () => {
  const { sessionId } = useParams();

  return (
    <Container>
      <StudySessionDetails {...studySessions[0]} />
      <CommentList sessionId={sessionId} />
    </Container>
  );
};

export default StudySessionPage;
