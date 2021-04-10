import { Container } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword: React.VFC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Recover Password | Fashionframe</title>
        <meta name="description" content="Recover your password." />
      </Helmet>
      <ForgotPasswordForm />
    </Container>
  );
};

export default ForgotPassword;
