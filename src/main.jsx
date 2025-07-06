import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home/Home.jsx";
import DashboardContent from "./utils/DashboardContent.jsx";
import AdminDashboard from "./Components/Dashboard/Admin/AdminDashboard.jsx";
import UserDashboard from "./Components/Dashboard/User/UserDashboard.jsx";
import Error from "./Error.jsx";
import Root from "./Components/Dashboard/Root.jsx";
import Login from "./Components/Pages/login.jsx";
import Terms from "./Components/TermsandCondition/Terms.jsx";
import Privacy from "./Components/PrivacyandPolicy/Privacy.jsx";
import Forgot from "./Components/Pages/Forgot.jsx";
import SetNew from "./Components/Pages/SetNew.jsx";
import SuperAdminDashboard from "./Components/Dashboard/SuperAdmin/SuperAdminDashboard.jsx";
import IntekSpecialistDashboard from "./Components/Dashboard/IntekSpecialist/IntekSpecialistDashboard.jsx";
import CaseMangerDashboard from "./Components/Dashboard/CaseManager/CaseMangerDashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/terms",
    element: <Terms></Terms>,
  },
  {
    path: "/privacy",
    element: <Privacy></Privacy>,
  },
  {
    path: "/forgot",
    element: <Forgot></Forgot>,
  },
  {
    path: "/set",
    element: <SetNew></SetNew>,
  },
  {
    path: "/dashboard",
    element: <Root />,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <DashboardContent />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "superadmin",
        element: <SuperAdminDashboard></SuperAdminDashboard>,
      },
      {
        path: "caseManager",
        element: <CaseMangerDashboard></CaseMangerDashboard>,
      },
      {
        path: "intekSpecialist",
        element: <IntekSpecialistDashboard></IntekSpecialistDashboard>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
