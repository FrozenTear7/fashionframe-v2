import { Container, Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useUserContext } from '../../UserContext';
import { isString } from '../../utils/typeChecks';

const Error: React.VFC<{ error: AxiosError | string }> = ({ error }) => {
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useUserContext();

  if (isString(error)) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <strong>{error}</strong>
      </Alert>
    );
  }

  const resultError = error.response?.data || 'Unknown error';

  // Jwt expired error
  if (
    error.response &&
    error.response.status === 401 &&
    error.response.data &&
    error.response.data.message
  ) {
    setUser(null);
    enqueueSnackbar(error.response.data.message, {
      variant: 'error',
      autoHideDuration: 10000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    });
    return <Redirect to={{ pathname: '/signin', state: { from: pathname } }} />;
  }

  return (
    <Container maxWidth="md">
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <strong>{resultError}</strong>
          </Grid>
        </Grid>
      </Alert>
    </Container>
  );

  return <span />;
};

export default Error;
