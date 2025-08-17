import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children, allowedRoles }) {
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const refreshToken = useSelector((state) => state.auth?.refreshToken);
  const user = useSelector((state) => state.auth?.user);
  console.log(user)

  const location = useLocation()

  console.log("AccessToken:", accessToken);
  console.log("RefreshToken:", refreshToken);
  console.log("User Role:", user?.role);
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