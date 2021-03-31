/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../UserContext';
import { signUp } from '../../utils/auth';
import Error from '../../utils/Error';
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
      } catch (e) {
        console.log(e);
        setSignUpError(e);
      }
    }
  );

  return (
    <div className="SignUpForm">
      {signUpError && <Error error={signUpError} />}

      <form onSubmit={signInFormOnSubmit}>
        <label>Username</label>
        <input name="username" ref={register} />
        <p>{errors.username?.message}</p>

        <label>Email</label>
        <input name="email" ref={register} />
        <p>{errors.email?.message}</p>

        <label>Password</label>
        <input name="password" ref={register} />
        <p>{errors.password?.message}</p>

        <label>Repeat password</label>
        <input name="password2" ref={register} />
        <p>{errors.password2?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
