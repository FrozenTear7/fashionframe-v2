import * as React from 'react';
import { Helmet } from 'react-helmet-async';

const SignUp: React.VFC = () => {
  return (
    <div className="SignUp">
      <Helmet>
        <title>Sign up | Fashionframe</title>
        <meta
          name="description"
          content="Sign up to join the Fashionframe community and add your own fashion setups or save setups created by others."
        />
      </Helmet>
      Sign up
    </div>
  );
};

export default SignUp;
