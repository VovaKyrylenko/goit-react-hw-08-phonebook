import React, { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { selectIsLogged } from 'selectors/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/apiSlice';
import { PrivateRoute, PublicRoute } from 'routes/routesConfig';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'pages/layout';
import Loader from './Loader';
import { getCurrentUser } from 'redux/userSlice';

const HomePage = lazy(() => import('pages/homePage'));
const LogUpPage = lazy(() => import('pages/logupPage'));
const LoginPage = lazy(() => import('pages/loginPage'));
const ContactsPage = lazy(() => import('pages/contactsPage/contactsPage'));

const App = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  useEffect(() => {
    if (isLogged) {
      dispatch(fetchContacts());
    }
    dispatch(getCurrentUser());
  }, [isLogged, dispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<PublicRoute />}>
              <Route path="" element={<HomePage />} />
            </Route>
            <Route path="register" element={<PublicRoute restricted />}>
              <Route path="" element={<LogUpPage />} />
            </Route>
            <Route path="login" element={<PublicRoute restricted />}>
              <Route path="" element={<LoginPage />} />
            </Route>
            <Route path="contacts" element={<PrivateRoute />}>
              <Route path="" element={<ContactsPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
