import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogged } from 'selectors/selectors';
import React from 'react';

const PublicRoute = ({ restricted = false }) => {
  const isLogged = useSelector(selectIsLogged);
  return isLogged && restricted ? (
    <Navigate to="/goit-react-hw-08-phonebook/contacts" />
  ) : (
    <Outlet />
  );
};

const PrivateRoute = () => {
  const isLogged = useSelector(selectIsLogged);
  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/goit-react-hw-08-phonebook/login" />
  );
};

export { PublicRoute, PrivateRoute };
