import { setupDB } from '../../testSetup';
import ColorScheme from '../ColorScheme';
import mongoose from 'mongoose';
import Syandana from '../Syandana';

describe('Syandana model test', () => {
  setupDB();

  test('create syandana successfully', async () => {
    const syandanaData = {
      name: 'Test',
    };

    const validSyandana = await Syandana.create({
      colorScheme: await ColorScheme.create({}),
      ...syandanaData,
    });

    expect(validSyandana._id).toBeDefined();
    expect(validSyandana.name).toBe(syandanaData.name);
  });

  test('creating attachments without required fields should return an error', async () => {
    try {
      await Syandana.create({ colorScheme: await ColorScheme.create({}) });
    } catch (e) {
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.name).toBeDefined();
    }

    try {
      await Syandana.create({
        name: 'Test',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.colorScheme).toBeDefined();
    }
  });

  test('deleting syandana also deletes colorScheme', async () => {
    const syandana = await Syandana.create({
      name: 'Test',
      colorScheme: await ColorScheme.create({}),
    });

    await syandana.remove();

    const colorScheme = await ColorScheme.findById(syandana.colorScheme);

    expect(colorScheme).toBe(null);
  });
});
