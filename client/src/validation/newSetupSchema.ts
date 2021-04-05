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
  attachments: yup.object().shape({
    chest: yup.string(),
    leftArm: yup.string(),
    rightArm: yup.string(),
    leftLeg: yup.string(),
    rightLeg: yup.string(),
    ephemera: yup.string(),
    colorScheme: yup.object().shape({
      primary: yup.string(),
      secondary: yup.string(),
      tertiary: yup.string(),
      accents: yup.string(),
      emmissive1: yup.string(),
      emmissive2: yup.string(),
      energy1: yup.string(),
      energy2: yup.string(),
    }),
  }),
  syandana: yup.object().shape({
    name: yup.string(),
    colorScheme: yup.object().shape({
      primary: yup.string(),
      secondary: yup.string(),
      tertiary: yup.string(),
      accents: yup.string(),
      emmissive1: yup.string(),
      emmissive2: yup.string(),
      energy1: yup.string(),
      energy2: yup.string(),
    }),
  }),
  colorScheme: yup.object().shape({
    primary: yup.string(),
    secondary: yup.string(),
    tertiary: yup.string(),
    accents: yup.string(),
    emmissive1: yup.string(),
    emmissive2: yup.string(),
    energy1: yup.string(),
    energy2: yup.string(),
  }),
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
