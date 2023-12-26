import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import IsNotAuthenticated from "./utils/IsNotAuthenticated";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import "./index.css";
import Layout from "./layouts/Layout";
import NoLayout from "./layouts/NoLayout";
import Users from "./pages/admin/Users";
import WorkClock from "./pages/WorkClock";
import WorkAttendace from "./pages/WorkAttendance";
import EmployeesWorkAttendance from "./pages/admin/EmployeesWorkAttendance";
import LeaveRequests from "./pages/admin/LeaveRequests";
import EmployeeLeaveRequest from "./pages/EmployeeLeaveRequest";
import CompanySettings from "./pages/admin/CompanySettings";
import Analytics from "./pages/admin/Analytics";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "admin",
        element: <PrivateRoute component={Layout} aId={3} />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "leave-requests",
            element: <LeaveRequests />,
          },
          {
            path: "company-settings",
            element: <CompanySettings />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
        ],
      },
      {
        path: "accountant",
        element: <PrivateRoute component={Layout} aId={2} />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "work-attendance",
            element: <EmployeesWorkAttendance />,
          },
        ],
      },
      {
        path: "employee",
        element: <PrivateRoute component={Layout} aId={1} />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "work-clock",
            element: <WorkClock />,
          },
          {
            path: "work-attendance",
            element: <WorkAttendace />,
          },
          {
            path: "leave-request",
            element: <EmployeeLeaveRequest />,
          },
        ],
      },
      {
        path: "user",
        element: <PrivateRoute component={Layout} aId={1} />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "",
        element: <IsNotAuthenticated component={NoLayout} />,
        children: [
          {
            path: "",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
