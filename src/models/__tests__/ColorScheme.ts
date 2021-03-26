import { setupDB } from './../../testSetup';
import ColorScheme from '../ColorScheme';
import mongoose from 'mongoose';

describe('ColorScheme model test', () => {
  setupDB();

  test('create colorScheme successfully', async () => {
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

    const validColorScheme = await ColorScheme.create(colorSchemeData);

    expect(validColorScheme._id).toBeDefined();
    expect(validColorScheme.primary).toBe(colorSchemeData.primary);
    expect(validColorScheme.secondary).toBe(colorSchemeData.secondary);
    expect(validColorScheme.tertiary).toBe(colorSchemeData.tertiary);
    expect(validColorScheme.accents).toBe(colorSchemeData.accents);
    expect(validColorScheme.emmissive1).toBe(colorSchemeData.emmissive1);
    expect(validColorScheme.emmissive2).toBe(colorSchemeData.emmissive2);
    expect(validColorScheme.energy1).toBe(colorSchemeData.energy1);
    expect(validColorScheme.energy2).toBe(colorSchemeData.energy2);
  });

  test('creating colorScheme with an invalid color format should return an error', async () => {
    try {
      await ColorScheme.create({
        primary: 'InvalidFormat',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.primary).toBeDefined();
    }
  });
});
