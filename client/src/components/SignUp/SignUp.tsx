import { Container } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import SignUpForm from './SignUpForm';

const SignUp: React.VFC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Sign up | Fashionframe</title>
        <meta
          name="description"
          content="Sign up to join the Fashionframe community and add your own fashion setups or save setups created by others."
        />
      </Helmet>
      <SignUpForm />
    </Container>
  );
};

export default SignUp;
