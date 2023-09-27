import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../utils/contexts/AuthProvider';

interface IsNotAuthenticatedProps {
  component: React.ComponentType;
}

const IsNotAuthenticated: React.FC<IsNotAuthenticatedProps> = ({ component: Component }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.accessId == 1){
        navigate("/employee")
    }else if(user?.accessId == 2){
        navigate("/accountant")
    }else if(user?.accessId == 3){
        navigate("/admin")
    }
  }, [user, navigate]);

  if (!user) {
    return <div>loading</div>;
  }

  return <Component />;
};

export default IsNotAuthenticated;
