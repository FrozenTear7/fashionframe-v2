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
// import PrivateRoute from './utils/PrivateRoute';
import NotFound from './utils/NotFound';
import { UserContext } from './UserContext';
import { ContextUser } from './types';

const App: React.VFC = () => {
  const [user, setUser] = React.useState<ContextUser | null>(null);

  // Fetch CSRF token for security measures
  React.useEffect(() => {
    const getCsrfToken = async (): Promise<void> => {
      const { data } = await axios.get('/api/users/csrf-token');
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
    };

    void getCsrfToken();
  }, []);

  return (
    <HelmetProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/setups" component={Setups} />
            <Route exact path="/setups/:id" component={Setup} />
            <Route path="/profile" component={User} />
            <Route path="/user/:id" component={User} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </UserContext.Provider>
    </HelmetProvider>
  );
};

export default App;
