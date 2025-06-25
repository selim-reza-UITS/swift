import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const refreshToken = useSelector((state) => state.auth?.refreshToken);
  const user = useSelector((state) => state.auth?.user);

  // Handle both Admin and Student structures
  const isAuthenticated = user?.is_active || user?.user?.is_active;

  if (accessToken && refreshToken && isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
