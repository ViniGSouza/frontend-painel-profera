import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

interface PrivateRouteProps {
  element: ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
  const userToken = useAuthStore((state) => state.userToken);

  return userToken ? Component : <Navigate to="/" replace />;
};
