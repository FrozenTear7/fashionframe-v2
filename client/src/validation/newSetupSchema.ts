import * as yup from 'yup';

const newSetupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .required('Required'),
  description: yup.string(),
  frame: yup.string().required('Required'),
  helmet: yup.string().required('Required'),
  skin: yup.string().required('Required'),
  screenshotImage: yup
    .mixed()
    .test('fileRequired', 'Required', (value: File[]) => {
      return value.length > 0;
    })
    .test('fileSize', 'This file is too large', (value: File[]) => {
      if (!value.length) return true;
      return value[0].size <= 5000000;
    })
    .test('fileType', 'Invalid file format', (value: File[]) => {
      if (!value.length) return true;
      return /^image\/.+$/.test(value[0].type);
    }),
});

export default newSetupSchema;
