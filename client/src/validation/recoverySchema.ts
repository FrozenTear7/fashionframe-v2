import * as yup from 'yup';

const signInSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Must be at least 6 characters long')
    .required('Required'),
  password2: yup
    .string()
    .min(6, 'Must be at least 6 characters long')
    .required('Required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default signInSchema;
