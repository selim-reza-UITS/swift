import { Outlet, useNavigate, useLocation } from "react-router-dom";
import getRole from "../../utils/role";
import { useEffect } from "react";
import AdminDashboard from "./Admin/AdminDashboard";
import UserDashboard from "./User/UserDashboard";
import AdminSidebar from "./Sidebar/AdminSidebar";
import UserSidebar from "./Sidebar/UserSidebar";
import Header from "./Header";
import CaseMangerSidebar from "./Sidebar/CaseMangerSidebar";
import SuperAdminSidebar from "./Sidebar/SuperAdminSidebar";
import IntekSpecialistSidebar from "./Sidebar/IntekSpecialistSidebar";
import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard";
import CaseMangerDashboard from "./CaseManager/CaseMangerDashboard";
import IntekSpecialistDashboard from "./IntekSpecialist/IntakeSpecialistDashboard";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To check the current pathname
  const role = getRole();

  // Redirect to login if no role is found (user not logged in)
  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, [role, navigate]);

  if (role === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Function to render default dashboard content based on role
  const renderDefaultDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "superadmin":
        return <SuperAdminDashboard></SuperAdminDashboard>;
      case "CaseManager":
        return <CaseMangerDashboard></CaseMangerDashboard>;
      case "IntekSpecialist":
        return <IntekSpecialistDashboard></IntekSpecialistDashboard>;

      default:
        return <div>Unauthorized or invalid role</div>;
    }
  };

  // Check if we're on the root /dashboard path (no child route active)
  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen bg-[#101725] dark:bg-[#101725]">
      {/* Sidebar - Fixed Position */}
      <div className="w-[280px] fixed left-0 top-0 h-screen">
        {role === "superadmin" && <SuperAdminSidebar></SuperAdminSidebar>}

        {role === "admin" && <AdminSidebar />}
        {role === "CaseManager" && <CaseMangerSidebar></CaseMangerSidebar>}
        {role === "IntekSpecialist" && (
          <IntekSpecialistSidebar></IntekSpecialistSidebar>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[280px]">
        {/* Header */}
        <Header />

        {/* Render Child Routes or Default Dashboard */}
        <main className="flex-1 bg-[#101725] dark:bg-[#101725]  p-4 overflow-y-auto ">
          {isDashboardRoot ? renderDefaultDashboard() : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Root;
