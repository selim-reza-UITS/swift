import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
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
import { store, persistor } from "./Redux/store.js";

import Terms from "./Components/TermsandCondition/Terms.jsx";
import Privacy from "./Components/PrivacyandPolicy/Privacy.jsx";
import Forgot from "./Components/Pages/Forgot.jsx";
import SetNew from "./Components/Pages/SetNew.jsx";
import SuperAdminDashboard from "./Components/Dashboard/SuperAdmin/SuperAdminDashboard.jsx";
import IntakeSpecialistDashboard from "./Components/Dashboard/IntekSpecialist/IntakeSpecialistDashboard.jsx";
import CaseMangerDashboard from "./Components/Dashboard/CaseManager/CaseMangerDashboard.jsx";
import Login from "./Components/Pages/Login.jsx";
import ClientDetails from "./Components/Shared/ClientDetails.jsx";
import IntakeSpecialistClients from "./Components/Dashboard/IntekSpecialist/IntakeSpecialistClients.jsx";
import CaseManagerClients from "./Components/Dashboard/CaseManager/CaseManagerClients.jsx";
import MyFirm from "./Components/Dashboard/Admin/MyFirm/MyFirm.jsx";
import Settings from "./Components/Dashboard/Admin/Settings/Settings.jsx";
import Client from "./Components/Dashboard/Admin/Client/Client.jsx";
import LawFirm from "./Components/Dashboard/SuperAdmin/LawFirm/LawFirm.jsx";
import { Toaster } from "react-hot-toast";
import SetPassword from "./Components/Pages/SetPassword.jsx";
import ConfirmNumber from "./Components/Pages/ConfirmNumber .jsx";
import { Edit } from "lucide-react";
import EditAndViewPart from "./Components/Dashboard/Admin/ChatWithDetails/EditAndViewPart.jsx";
import { PrivateRoute } from "./Routes/PrivateRoute.jsx";

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
    path: "/wa-health-data",
    element: <ConfirmNumber></ConfirmNumber>,
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
    path: `/set-password/:uuid/:token`,
    element: <SetPassword></SetPassword>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <DashboardContent />,
      },
      // just superadmin  role  route will be here
      {
        path: "superadmin",
        element: (
          <PrivateRoute allowedRoles={["superadmin"]}>
            <SuperAdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "law-Firm",
        element: (
          <PrivateRoute allowedRoles={["superadmin"]}>
            {" "}
            <LawFirm></LawFirm>{" "}
          </PrivateRoute>
        ),
      },
      // just admin role route will be here
      {
        path: "admin",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "adminClient",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            {" "}
            <Client></Client>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "admin/:id",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            {" "}
            <EditAndViewPart></EditAndViewPart>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "my-firm",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            {" "}
            <MyFirm></MyFirm>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute
            allowedRoles={[
              "admin",
              "superadmin",
              "IntekSpecialist",
              "CaseManager",
            ]}
          >
            {" "}
            <Settings></Settings>{" "}
          </PrivateRoute>
        ),
      },

      // all Lawyer role route will be there
      {
        path: "caseManager",
        element: (
          <PrivateRoute allowedRoles={["caseManager"]}>
            {" "}
            <CaseMangerDashboard></CaseMangerDashboard>{" "}
          </PrivateRoute>
        ),
      },
      //all intake specialist role route will be there
      {
        path: "caseManagerClients",
        element: (
          <PrivateRoute allowedRoles={["caseManager"]}>
            {" "}
            <CaseManagerClients />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "caseManagerClients/:id",
        element: (
          <PrivateRoute allowedRoles={["caseManager"]}>
            {" "}
            <ClientDetails />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "caseManagerSettings",
        element: (
          <PrivateRoute allowedRoles={["caseManager"]}>
            {" "}
            <Settings></Settings>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "intakeSpecialist",
        element: (
          <PrivateRoute allowedRoles={["intakeSpecialist"]}>
            {" "}
            <IntakeSpecialistDashboard></IntakeSpecialistDashboard>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "intakeSpecialistClients",
        element: (
          <PrivateRoute allowedRoles={["intakeSpecialist"]}>
            {" "}
            <IntakeSpecialistClients />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "intakeSpecialistClients/:id",
        element: (
          <PrivateRoute allowedRoles={["intakeSpecialist"]}>
            {" "}
            <ClientDetails />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "intakeSpecialistSettings",
        element: (
          <PrivateRoute allowedRoles={["intakeSpecialist"]}>
            {" "}
            <Settings />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <Toaster />
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
  // </StrictMode>
);
