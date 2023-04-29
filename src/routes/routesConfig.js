import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogged } from 'selectors/selectors';
import React from 'react';

const PublicRoute = ({ restricted = false }) => {
  const isLogged = useSelector(selectIsLogged);
  return isLogged && restricted ? <Navigate to="/contacts" /> : <Outlet />;
};

const PrivateRoute = () => {
  const isLogged = useSelector(selectIsLogged);
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export { PublicRoute, PrivateRoute };
