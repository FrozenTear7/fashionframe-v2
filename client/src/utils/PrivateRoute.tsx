/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const PrivateRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const { user } = useUserContext();
  // console.log(rest);

  return !user ? (
    <Redirect to={{ pathname: '/signin', state: { from: '/profile' } }} />
  ) : (
    <Route {...rest} />
  );
};

export default PrivateRoute;
