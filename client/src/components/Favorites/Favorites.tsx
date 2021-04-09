import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxios from 'axios-hooks';
import { Grid, Typography } from '@material-ui/core';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import { SetupItem } from '../../types/Setup';
import SetupList from '../Setups/SetupList';

const Favorites: React.VFC = () => {
  const [
    { data: setups, loading: setupsLoading, error: setupsError },
    fetchSetups,
  ] = useAxios<SetupItem[], string>('/api/setups/favorites');

  React.useEffect(() => {
    void fetchSetups();
  }, []);

  if (setupsLoading) return <Loading />;
  if (setupsError) return <Error error={setupsError.message} />;
  if (!setups) return <Error error="Something went wrong" />;
  return (
    <>
      <Helmet>
        <title>Favorites | Fashionframe</title>
        <meta name="description" content="Your favorited fashion setups" />
      </Helmet>
      <Grid container justify="center">
        <Typography variant="h4" component="p">
          Your favorited setups:
        </Typography>
      </Grid>
      <SetupList setups={setups} />
    </>
  );
};

export default Favorites;
