import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'
import IsNotAuthenticated from './utils/IsNotAuthenticated';
import Login from './pages/Login';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard';
import './index.css'
import Layout from './layouts/Layout';
import NoLayout from './layouts/NoLayout';
import Users from './pages/Users';
import WorkClock from './pages/WorkClock';


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
            element: <Dashboard />
          },
          {
            path: "users",
            element: <Users />
          },
        ]
      },
      {
        path: "accountant",
        element: <PrivateRoute component={Layout} aId={2} />,
        children: [
          {
            path: "",
            element: <Dashboard />
          },

        ]
      },
      {
        path: "employee",
        element: <PrivateRoute component={Layout} aId={1} />,
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "work-clock",
            element: <WorkClock />
          },

        ]
      },
      {
        path: "",
        element: <IsNotAuthenticated component={NoLayout} />,
        children: [
          {
            path: "",
            element: <Login />,
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)