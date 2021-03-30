import * as React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUserContext } from '../../UserContext';
import { signUp } from '../../utils/auth';

const SignUpForm: React.VFC = () => {
  const { setUser } = useUserContext();

  const signUpFormOnSubmit = async (
    username: string,
    email: string,
    password: string,
    password2: string
  ): Promise<void> => {
    try {
      setUser(await signUp(username, email, password, password2));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', password2: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, 'Must be at least 3 characters long')
          .max(20, 'Must be at most 20 characters long')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(6, 'Must be at least 6 characters long')
          .required('Required'),
        password2: Yup.string()
          .min(6, 'Must be at least 6 characters long')
          .required('Required'),
      })}
      onSubmit={async (
        { username, email, password, password2 },
        { setSubmitting }
      ): Promise<void> => {
        await signUpFormOnSubmit(username, email, password, password2);
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="username">Username</label>
        <Field name="username" type="text" />
        <ErrorMessage name="username" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />

        <label htmlFor="password2">Repeat password</label>
        <Field name="password2" type="password" />
        <ErrorMessage name="password2" />

        <button type="submit">Sign up</button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
