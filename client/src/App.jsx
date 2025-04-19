import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import DefaultLayout from "./components/DefaultLayout";

import HomePage from "./pages/Home";
import StudySessionPage from "./pages/StudySession";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CreateSessionPage from "./pages/CreateSession";
import ProfilePage from "./pages/Profile";
import QUTEventsPage from "./pages/QUTEvents";

function App() {
  const location = useLocation();
  const state = location.state;
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/session/:sessionId"
            element={
              isAuthenticated ? (
                <StudySessionPage />
              ) : (
                <Navigate
                  to="/login"
                  state={{ backgroundLocation: location }}
                  replace
                />
              )
            }
          />
          <Route
            path="/create-session"
            element={
              isAuthenticated ? (
                <CreateSessionPage />
              ) : (
                <Navigate
                  to="/login"
                  state={{ backgroundLocation: location }}
                  replace
                />
              )
            }
          />
          <Route
            path="/profile/:id"
            element={
              isAuthenticated ? (
                <ProfilePage />
              ) : (
                <Navigate
                  to="/login"
                  state={{ backgroundLocation: location }}
                  replace
                />
              )
            }
          />
          <Route path="/qut-events" element={<QUTEventsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
