import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../utils/contexts/AuthProvider";
import axios from "axios";
import Loading from "../components/Loading";

interface PrivateRouteProps {
  component: React.ComponentType;
  aId?: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  aId = 1,
}) => {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getStatus() {
      try {
        const res = await axios.get("/api/login/status");
        if (res.data.user.accessId == 0) {
          console.log("not logged in");
          if (!(location.pathname == "/")) navigate("/");
        } else if (aId > res.data.user.accessId) {
          console.log("not authorized");
          if (res.data.user.accessId == 1) {
            if (!(location.pathname == "/employee/work-clock"))
              navigate("/employee/work-clock");
          } else if (res.data.user.accessId == 2) {
            if (!(location.pathname == "/accountant"))
              navigate("/accountant/work-attendance");
          }
        }

        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getStatus();
  }, [location.pathname, user?.accessId]);

  if (loading) {
    return <Loading />;
  }

  return <Component />;
};

export default PrivateRoute;
