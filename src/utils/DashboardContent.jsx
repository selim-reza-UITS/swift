import { Navigate } from "react-router-dom";
import AdminDashboard from "../Components/Dashboard/Admin/AdminDashboard";
import UserDashboard from "../Components/Dashboard/User/UserDashboard";
import getRole from "./role";
import CaseMangerDashboard from "../Components/Dashboard/CaseManager/CaseMangerDashboard";
import SuperAdminDashboard from "../Components/Dashboard/SuperAdmin/SuperAdminDashboard";
import IntekSpecialistDashboard from "../Components/Dashboard/IntekSpecialist/IntakeSpecialistDashboard";

export default function DashboardContent() {
  //   const role = useSelector((state) => state.auth?.user?.role);
  const role = getRole();

  if (!role) return <p>Loading...</p>;

  switch (role?.toLowerCase()) {
    case "superadmin":
      return <SuperAdminDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "CaseManager":
      return <CaseMangerDashboard />;
    case "IntekSpecialist":
      return <IntekSpecialistDashboard></IntekSpecialistDashboard>;
    default:
      return <Navigate to="/" />;
  }
}
