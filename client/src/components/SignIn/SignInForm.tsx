/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useUserContext } from '../../UserContext';
import { signIn } from '../../utils/auth';
import Error from '../../utils/Error';

type SignInFormData = {
  username: string;
  password: string;
};

interface LocationState {
  from: {
    pathname: string;
  };
}

const signInSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .max(20, 'Must be at most 20 characters long')
    .required('Required'),
  password: yup
    .string()
    .min(6, 'Must be at least 6 characters long')
    .required('Required'),
});

const SignInForm: React.VFC = () => {
  const history = useHistory();
  const location = useLocation();

  const { setUser } = useUserContext();
  const [signInError, setSignInError] = React.useState<string>();

  const { register, handleSubmit, errors } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const signInFormOnSubmit = handleSubmit(async ({ username, password }) => {
    const { from }: LocationState = (location.state as LocationState) || {
      from: { pathname: '/' },
    };

    try {
      const userRes = await signIn(username, password);
      setUser(userRes);
      history.replace(from);
    } catch ({ response }) {
      console.log(response.data.message);
      setSignInError(response.data.message);
    }
  });

  return (
    <div className="SignInForm">
      {signInError && <Error error={signInError} />}

      <form onSubmit={signInFormOnSubmit}>
        <label>Username</label>
        <input name="username" ref={register} />
        <p>{errors.username?.message}</p>

        <label>Password</label>
        <input name="password" type="password" ref={register} />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
};

export default SignInForm;
