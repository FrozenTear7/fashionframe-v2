import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserContext } from '../UserContext';

export const SignedInRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const { user } = useUserContext();

  return user ? <Redirect to={{ pathname: '/' }} /> : <Route {...rest} />;
};

export const PrivateRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const { user } = useUserContext();

  return !user ? (
    <Redirect to={{ pathname: '/signin', state: { from: '/profile' } }} />
  ) : (
    <Route {...rest} />
  );
};
