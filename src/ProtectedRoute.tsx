// src/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const accessToken = localStorage.getItem('spotify_access_token');
  return accessToken ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
