import * as React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUserContext } from '../../UserContext';
import { signIn } from '../../utils/auth';

const SignInForm: React.VFC = () => {
  const { setUser } = useUserContext();

  const signInFormOnSubmit = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      setUser(await signIn(username, password));
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="username">Username</label>
        <Field name="username" type="text" />
        <ErrorMessage name="username" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
