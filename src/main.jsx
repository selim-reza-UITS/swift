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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
    {
    path: "/login",
    element:<Login></Login>,
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
        element: (
         
            <AdminDashboard />
         
        ),
      },
  {
        path: "user",
        element: (
         
            <UserDashboard/>
         
        ),
      },
      

  
   
    
    
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
