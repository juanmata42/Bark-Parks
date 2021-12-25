import React, { FunctionComponent } from 'react';
import { Navigate, Route } from 'react-router-dom';
import Auth from '../../auth/auth';
const ProtectedRoute: FunctionComponent<any> = ({
  element: element,
  path: path,
}) => {
  const isAuthenticated = localStorage.getItem('user');

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Route path="/login" element={<Auth />} />
  );
};

export default ProtectedRoute;
