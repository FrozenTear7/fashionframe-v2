/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const PrivateRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const { user } = useUserContext();

  return user ? <Redirect to="/signin" /> : <Route {...rest} />;
};

export default PrivateRoute;
