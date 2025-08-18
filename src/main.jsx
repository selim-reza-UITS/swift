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
    path: `/set-password/:uuid/:token`,
    element: <SetPassword></SetPassword>,
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
      // just superadmin  role  route will be here
      {
        path: "superadmin",
        element: <SuperAdminDashboard></SuperAdminDashboard>,
      },
      {
        path: "law-Firm",
        element: <LawFirm></LawFirm>,
      },
      // just admin role route will be here
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "adminClient",
        element: <Client></Client>,
      },
      {
        path: "my-firm",
        element: <MyFirm></MyFirm>,
      },
      {
        path: "settings",
        element: <Settings></Settings>,
      },

      // all Lawyer role route will be there
      {
        path: "caseManager",
        element: <CaseMangerDashboard></CaseMangerDashboard>,
      },
      //all intake specialist role route will be there
      {
        path: "caseManagerClients",
        element: <CaseManagerClients />,
      },
      {
        path: "caseManagerClients/:id",
        element: <ClientDetails />,
      },
      {
        path: "caseManagerSettings",
        element: <Settings></Settings>,
      },
      {
        path: "intakeSpecialist",
        element: <IntakeSpecialistDashboard></IntakeSpecialistDashboard>,
      },
      {
        path: "intakeSpecialistClients",
        element: <IntakeSpecialistClients />,
      },
      {
        path: "intakeSpecialistClients/:id",
        element: <ClientDetails />,
      },
      {
        path: "intakeSpecialistSettings",
        element: <Settings />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
