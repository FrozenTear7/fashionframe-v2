/* eslint-disable no-constant-condition */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute = ({ ...rest }: RouteProps): JSX.Element => {
  return 2 > 1 ? <Redirect to="/signin" /> : <Route {...rest} />;
};

export default PrivateRoute;
