import * as React from 'react';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import { UserContext } from './UserContext';
import { ContextUser } from './types';
import Loading from './components/Utils/Loading';
import Error from './components/Utils/Error';
import ResponsiveDrawerWrapper from './components/ResponsiveDrawerWrapper/ResponsiveDrawerWrapper';

const App: React.VFC = () => {
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
        <SnackbarProvider maxSnack={3}>
          <ResponsiveDrawerWrapper />
        </SnackbarProvider>
      </UserContext.Provider>
    </HelmetProvider>
  );
};

export default App;
