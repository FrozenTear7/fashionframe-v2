import { Button, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.VFC = () => {
  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>404 not found</strong>
          </Alert>
        </Grid>
        <Grid container spacing={6} justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/setups"
            >
              Homepage
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
