import * as yup from 'yup';

const signInSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Required'),
});

export default signInSchema;
