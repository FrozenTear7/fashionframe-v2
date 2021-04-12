import { Container } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import SignInForm from './SignInForm';

const SignIn: React.VFC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Sign in | Fashionframe</title>
        <meta
          name="description"
          content="Sign in to add your own fashion setups or save setups created by others."
        />
        <meta
          name="keywords"
          content="fashionframe, warframe, fashion, signin, login, join, social, hub, sharing"
        />
      </Helmet>
      <SignInForm />
    </Container>
  );
};

export default SignIn;
