import { setupDB } from './../../testSetup';
import ColorScheme from '../ColorScheme';

describe('ColorScheme model test', () => {
  setupDB(true);

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
