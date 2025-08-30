import { Navigate } from "react-router-dom";
import AdminDashboard from "../Components/Dashboard/Admin/AdminDashboard";
import UserDashboard from "../Components/Dashboard/User/UserDashboard";
import getRole from "./role";
import CaseMangerDashboard from "../Components/Dashboard/CaseManager/CaseMangerDashboard";
import SuperAdminDashboard from "../Components/Dashboard/SuperAdmin/SuperAdminDashboard";
import IntekSpecialistDashboard from "../Components/Dashboard/IntekSpecialist/IntakeSpecialistDashboard";

export default function DashboardContent() {
  const role = getRole();

  if (!role) return <div className="h-[86vh] flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>;

  switch (role?.toLowerCase()) {
    case "superadmin":
      return <SuperAdminDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "casemanager":
      return <CaseMangerDashboard />;
    case "intekspecialist":
      return <IntekSpecialistDashboard></IntekSpecialistDashboard>;
    default:
      return <Navigate to="/" />;
  }
}
