/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../UserContext';
import { signUp } from '../../utils/auth';
import Error from '../../utils/Error';

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .max(20, 'Must be at most 20 characters long')
    .required('Required'),
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .min(6, 'Must be at least 6 characters long')
    .required('Required'),
  password2: yup
    .string()
    .min(6, 'Must be at least 6 characters long')
    .required('Required'),
});

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
