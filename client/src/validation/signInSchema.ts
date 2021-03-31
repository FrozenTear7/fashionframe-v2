import * as yup from 'yup';

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

export default signInSchema;
