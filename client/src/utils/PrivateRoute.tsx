import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useUserContext } from '../UserContext';

export const SignedInRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const { user } = useUserContext();

  return user ? <Redirect to={{ pathname: '/' }} /> : <Route {...rest} />;
};

export const PrivateRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const { user } = useUserContext();
  const { pathname } = useLocation();

  return !user ? (
    <Redirect to={{ pathname: '/signin', state: { from: pathname } }} />
  ) : (
    <Route {...rest} />
  );
};
