import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../utils/contexts/AuthProvider';
import axios from 'axios';

interface PrivateRouteProps {
  component: React.ComponentType;
  aId?: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, aId = 1 }) => {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getStatus() {
      try {
        const res = await axios.get('/api/login/status');
        if (res.data.user.type === 'visitor') {
          navigate('/');
        }
        if (res.data.user.accessId == 1) {
          navigate('/employee');
        }
        if (res.data.user.accessId == 2) {
            navigate('/accountant');
          }
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getStatus();
  }, [aId, navigate, setUser]);

  if (loading) {
    return <div>loading</div>;
  }

  return <Component />;
};

export default PrivateRoute;
