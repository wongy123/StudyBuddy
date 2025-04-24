import { useUser } from "../../hooks/useUser";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const { user, token } = useUser();

  if (!token || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
