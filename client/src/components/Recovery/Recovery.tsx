import { Container } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps } from 'react-router-dom';
import RecoveryForm from './RecoveryForm';

const Recovery: React.VFC<RouteComponentProps<{ token: string }>> = ({
  match,
}) => {
  const { token } = match.params;

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Recover password | Fashionframe</title>
        <meta name="description" content="Recover your password." />
      </Helmet>
      <RecoveryForm token={token} />
    </Container>
  );
};

export default Recovery;
