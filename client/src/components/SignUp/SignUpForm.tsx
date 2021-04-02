/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../UserContext';
import { signUp } from '../../utils/auth';
import Error from '../Utils/Error';
import signUpSchema from '../../validation/signUpSchema';
import { SignUpFormData } from '../../types/SignUp';

const SignUpForm: React.VFC = () => {
  const { setUser } = useUserContext();
  const [signUpError, setSignUpError] = React.useState<string>();

  const { register, handleSubmit, errors } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const signInFormOnSubmit = handleSubmit(
    async ({ username, email, password, password2 }) => {
      try {
        const userRes = await signUp(username, email, password, password2);
        setUser(userRes);
      } catch ({ response }) {
        console.log(response.data.message);
        setSignUpError(response.data.message);
      }
    }
  );

  return (
    <div className="SignUpForm">
      {signUpError && <Error error={signUpError} />}

      <form onSubmit={signInFormOnSubmit}>
        <label>Username</label>
        <input name="username" ref={register} />
        <>{errors.username?.message}</>

        <label>Email</label>
        <input name="email" ref={register} />
        <>{errors.email?.message}</>

        <label>Password</label>
        <input name="password" ref={register} />
        <>{errors.password?.message}</>

        <label>Repeat password</label>
        <input name="password2" ref={register} />
        <>{errors.password2?.message}</>

        <input type="submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
