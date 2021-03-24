import mongoose from 'mongoose';
import ColorScheme from '../ColorScheme';

describe('ColorScheme model test', () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('create & save colorScheme successfully', async () => {
    const colorSchemeData = {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      tertiary: '#FFFFFF',
      accents: '#FFFFFF',
      emmissive1: '#FFFFFF',
      emmissive2: '#FFFFFF',
      energy1: '#FFFFFF',
      energy2: '#FFFFFF',
    };

    const validColorScheme = new ColorScheme(colorSchemeData);
    const savedColorScheme = await validColorScheme.save();

    expect(savedColorScheme._id).toBeDefined();
    expect(savedColorScheme.primary).toBe(colorSchemeData.primary);
    expect(savedColorScheme.secondary).toBe(colorSchemeData.secondary);
    expect(savedColorScheme.tertiary).toBe(colorSchemeData.tertiary);
    expect(savedColorScheme.accents).toBe(colorSchemeData.accents);
    expect(savedColorScheme.emmissive1).toBe(colorSchemeData.emmissive1);
    expect(savedColorScheme.emmissive2).toBe(colorSchemeData.emmissive2);
    expect(savedColorScheme.energy1).toBe(colorSchemeData.energy1);
    expect(savedColorScheme.energy2).toBe(colorSchemeData.energy2);
  });

  // // Test Schema is working!!!
  // // You shouldn't be able to add in any field that isn't defined in the schema
  // it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
  //   const userWithInvalidField = new UserModel({
  //     name: 'TekLoon',
  //     gender: 'Male',
  //     nickname: 'Handsome TekLoon',
  //   });
  //   const savedUserWithInvalidField = await userWithInvalidField.save();
  //   expect(savedUserWithInvalidField._id).toBeDefined();
  //   expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  // });

  // // Test Validation is working!!!
  // // It should us told us the errors in on gender field.
  // it('create user without required field should failed', async () => {
  //   const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
  //   let err;
  //   try {
  //     const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
  //     error = savedUserWithoutRequiredField;
  //   } catch (error) {
  //     err = error;
  //   }
  //   expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  //   expect(err.errors.gender).toBeDefined();
  // });
});
