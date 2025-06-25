import { Navigate } from "react-router-dom";
import AdminDashboard from "../Components/Dashboard/Admin/AdminDashboard";
import UserDashboard from "../Components/Dashboard/User/UserDashboard";
import getRole from "./role";

export default function DashboardContent() {
  //   const role = useSelector((state) => state.auth?.user?.role);
  const role = getRole();

  if (!role) return <p>Loading...</p>;

  switch (role?.toLowerCase()) {
    case "Admin":
      return <AdminDashboard />;
    case "User":
      return <UserDashboard />;
    default:
      return <Navigate to="/" />;
  }
}
