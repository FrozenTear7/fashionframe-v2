import * as React from 'react';
import { Route, Switch } from 'react-router';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';
import { Container, createStyles, makeStyles } from '@material-ui/core';
import Setup from './components/Setup/Setup';
import Setups from './components/Setups/Setups';
import User from './components/User/User';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import NotFound from './components/Utils/NotFound';
import { UserContext } from './UserContext';
import { ContextUser } from './types';
import { PrivateRoute, SignedInRoute } from './utils/PrivateRoute';
import NewSetup from './components/NewSetup/NewSetup';
import Loading from './components/Utils/Loading';
import Error from './components/Utils/Error';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      paddingTop: '3rem',
    },
  })
);

const App: React.VFC = () => {
  const classes = useStyles();

  const [user, setUser] = React.useState<ContextUser | null>(null);
  const [initialDataLoading, setInitialDataLoading] = React.useState(true);
  const [initialDataError, setInitialDataError] = React.useState<string>();

  React.useEffect(() => {
    // Fetch CSRF token for security measures and then user profile
    const getUserData = async (): Promise<void> => {
      setInitialDataError(undefined);
      setInitialDataLoading(true);

      try {
        const { data: csrfData } = await axios.get('/api/users/csrf-token');
        axios.defaults.headers.post['X-CSRF-Token'] = csrfData.csrfToken;

        const { data: profileData } = await axios.get('/api/users/me');
        setUser(profileData);
      } catch ({ response }) {
        console.log(response.data.message);
        setInitialDataError(response.data.message);
      } finally {
        setInitialDataLoading(false);
      }
    };

    void getUserData();
  }, []);

  if (initialDataLoading) return <Loading />;
  if (initialDataError) return <Error error={initialDataError} />;
  return (
    <HelmetProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <SignedInRoute exact path="/signup" component={SignUp} />
              <SignedInRoute exact path="/signin" component={SignIn} />
              <Route exact path="/setups" component={Setups} />
              <PrivateRoute exact path="/setups/create" component={NewSetup} />
              <Route exact path="/setups/:id" component={Setup} />
              <PrivateRoute path="/profile" component={User} />
              <Route path="/user/:id" component={User} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </div>
      </UserContext.Provider>
    </HelmetProvider>
  );
};

export default App;
