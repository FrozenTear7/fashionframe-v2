import * as yup from 'yup';

const newSetupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .required('Required'),
  description: yup.string(),
});

export default newSetupSchema;
