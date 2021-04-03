import { Alert, AlertTitle } from '@material-ui/lab';
import * as React from 'react';

const Error: React.VFC<{ error: string }> = ({ error }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>{error}</strong>
    </Alert>
  );
};

export default Error;
