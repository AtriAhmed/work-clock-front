import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../utils/contexts/AuthProvider";
import Loading from "../components/Loading";

interface IsNotAuthenticatedProps {
  component: React.ComponentType;
}

const IsNotAuthenticated: React.FC<IsNotAuthenticatedProps> = ({
  component: Component,
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      if (user?.accessId == 1) {
        console.log("already logged in 1");
        console.log(location.pathname);
        if (!(location.pathname == "/employee/work-clock"))
          navigate("/employee/work-clock");
      } else if (user?.accessId == 2) {
        console.log("already logged in 2");
        if (!(location.pathname == "/accountant"))
          navigate("/accountant/work-attendance");
      } else if (user?.accessId == 3) {
        console.log("already logged in 3");
        if (!(location.pathname == "/admin")) navigate("/admin");
      }
  }, [user?.accessId, location.pathname]);

  if (!user) {
    return <Loading />;
  }

  return <Component />;
};

export default IsNotAuthenticated;
