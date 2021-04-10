import * as React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { PrivateRoute, SignedInRoute } from '../../utils/PrivateRoute';
import Setup from '../Setup/Setup';
import Setups from '../Setups/Setups';
import User from '../User/User';
import NewSetup from '../NewSetup/NewSetup';
import Homepage from '../Homepage/Homepage';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import NotFound from '../Utils/NotFound';
import About from '../About/About';
import APIPage from '../APIPage/APIPage';
import Favorites from '../Favorites/Favorites';
import Recovery from '../Recovery/Recovery';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

const AppSwitch: React.VFC = () => {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/about-api" component={APIPage} />
      <Route exact path="/about" component={About} />
      <SignedInRoute exact path="/signup" component={SignUp} />
      <SignedInRoute exact path="/signin" component={SignIn} />
      <SignedInRoute exact path="/forgot" component={ForgotPassword} />
      <SignedInRoute exact path="/reset/:token" component={Recovery} />
      <Route exact path="/setups" component={Setups} />
      <PrivateRoute exact path="/setups/create" component={NewSetup} />
      <PrivateRoute exact path="/setups/favorites" component={Favorites} />
      <Route exact path="/setups/:id" component={Setup} />
      <Route exact path="/users/:id" component={User} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppSwitch;
