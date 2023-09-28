import React from 'react';
import { useAuthContext, AuthContextType } from './contexts/AuthProvider';

interface RenderIfAIdProps {
  aIdEqual?: number;
  aIdIn?: Array<Number>;
  aIdSup?: number;
  children: React.ReactNode;
}

const RenderIfAId: React.FC<RenderIfAIdProps> = ({ aIdEqual, aIdIn,aIdSup, children }) => {
  const { user } = useAuthContext() as AuthContextType; // You might need to assert the type here

  if(aIdSup)
  if (user.accessId >= aIdSup) return <div>{children}</div>;

  if(aIdEqual)
  if (user.accessId == aIdEqual) return <div>{children}</div>;

  if(aIdIn)
  if (user.accessId in aIdIn) return <div>{children}</div>;

  return null; // Or render nothing if the condition is not met
};

export default RenderIfAId;
