import * as React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { useUserContext } from '../../UserContext';
import { signIn } from '../../utils/auth';
import Error from '../../utils/Error';

interface LocationState {
  from: {
    pathname: string;
  };
}

const SignInForm: React.VFC = () => {
  const history = useHistory();
  const location = useLocation();

  const { setUser } = useUserContext();
  const [signInError, setSignInError] = React.useState<string>();

  const signInFormOnSubmit = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const user = await signIn(username, password);
      setUser(user);
    } catch (e) {
      console.log(e);
      setSignInError(e);
    }
  };

  return (
    <div className="SignInForm">
      {signInError && <Error error={signInError} />}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, 'Must be at least 3 characters long')
            .max(20, 'Must be at most 20 characters long')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Must be at least 6 characters long')
            .required('Required'),
        })}
        onSubmit={async (
          { username, password },
          { setSubmitting }
        ): Promise<void> => {
          await signInFormOnSubmit(username, password);

          const { from }: LocationState = (location.state as LocationState) || {
            from: { pathname: '/' },
          };

          setSubmitting(false);
          history.replace(from);
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field name="username" type="text" />
          <ErrorMessage name="username" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <button type="submit">Sign in</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignInForm;
