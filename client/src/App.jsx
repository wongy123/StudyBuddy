import { Routes, Route, useLocation } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import LoginLayout from './components/LoginLayout';

import HomePage from './pages/Home';
import StudySessionPage from './pages/StudySession';
import LoginPage from './pages/Login';

function App() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/session/:sessionId" element={<StudySessionPage />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;