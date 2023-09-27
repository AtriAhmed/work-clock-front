import React from 'react';
import { useAuthContext, AuthContextType } from './contexts/AuthProvider';

interface RenderIfAIdProps {
  aId: number;
  children: React.ReactNode;
}

const RenderIfAId: React.FC<RenderIfAIdProps> = ({ aId, children }) => {
  const { user } = useAuthContext() as AuthContextType; // You might need to assert the type here

  if (user.accessId >= aId) return <div>{children}</div>;

  return null; // Or render nothing if the condition is not met
};

export default RenderIfAId;
