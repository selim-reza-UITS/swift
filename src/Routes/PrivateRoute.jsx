import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children, allowedRoles }) {
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const refreshToken = useSelector((state) => state.auth?.refreshToken);
  const user = useSelector((state) => state.auth?.user);

  // Handle nested structure for both admin and student
  const role = user?.role || user?.user?.role;
  const isAuthenticated = user?.is_active || user?.user?.is_active;

  const location = useLocation();

  console.log("AccessToken:", accessToken);
  console.log("RefreshToken:", refreshToken);
  console.log("User Role:", role);
  console.log("Allowed Roles:", allowedRoles);
  console.log("Authenticated:", isAuthenticated);

  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
