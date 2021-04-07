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
    let mounted = true;

    // Fetch CSRF token for security measures and then user profile
    const getUserData = async (): Promise<void> => {
      if (mounted) {
        setInitialDataError(undefined);
        setInitialDataLoading(true);
      }

      try {
        const { data: userData } = await axios.get('/api/users/me');

        axios.defaults.headers.post['X-CSRF-Token'] = userData.csrfToken;
        if (mounted && userData._id && userData.username)
          setUser({ _id: userData._id, username: userData.username });
      } catch ({ response }) {
        console.log(response.data.message);
        if (mounted) setInitialDataError(response.data.message);
      } finally {
        if (mounted) setInitialDataLoading(false);
      }
    };

    void getUserData();

    return (): void => {
      mounted = false;
    };
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
