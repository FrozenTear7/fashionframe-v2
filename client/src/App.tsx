import * as React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';
import Setup from './components/Setup/Setup';
import Setups from './components/Setups/Setups';
import User from './components/User/User';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import NotFound from './utils/NotFound';
import { UserContext } from './UserContext';
import { ContextUser } from './types';
import { PrivateRoute, SignedInRoute } from './utils/PrivateRoute';
import NewSetup from './components/NewSetup/NewSetup';

const App: React.VFC = () => {
  const [user, setUser] = React.useState<ContextUser | null>(null);

  React.useEffect(() => {
    // Fetch CSRF token for security measures
    const getCsrfToken = async (): Promise<void> => {
      const { data } = await axios.get('/api/users/csrf-token');
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
    };

    // Also fetch user profile for the context
    const getUserProfile = async (): Promise<void> => {
      const { data } = await axios.get('/api/users/me');
      setUser(data);
    };

    void getCsrfToken();
    void getUserProfile();
  }, []);

  return (
    <HelmetProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <SignedInRoute exact path="/signup" component={SignUp} />
            <SignedInRoute exact path="/signin" component={SignIn} />
            <Route exact path="/setups" component={Setups} />
            <Route exact path="/setups/create" component={NewSetup} />
            <Route exact path="/setups/:id" component={Setup} />
            <PrivateRoute path="/profile" component={User} />
            <Route path="/user/:id" component={User} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </UserContext.Provider>
    </HelmetProvider>
  );
};

export default App;
