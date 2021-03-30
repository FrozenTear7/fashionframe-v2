import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import SignInForm from './SignInForm';

const SignIn: React.VFC = () => {
  return (
    <div className="SignIn">
      <Helmet>
        <title>Sign in | Fashionframe</title>
        <meta
          name="description"
          content="Sign in to add your own fashion setups or save setups created by others."
        />
      </Helmet>
      Sign in
      <SignInForm />
    </div>
  );
};

export default SignIn;
