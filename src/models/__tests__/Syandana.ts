import { setupTests } from '../../testSetup';
import ColorScheme from '../ColorScheme';
import mongoose from 'mongoose';
import Syandana from '../Syandana';

jest.mock('../../config', () => ({ jwtKey: 'TestJwtKey' }));

describe('Syandana model test', () => {
  setupTests();

  test('create syandana successfully', async (done) => {
    const syandanaData = {
      name: 'Test',
    };

    const validSyandana = await Syandana.create({
      colorScheme: await ColorScheme.create({}),
      ...syandanaData,
    });

    expect(validSyandana._id).toBeDefined();
    expect(validSyandana.name).toBe(syandanaData.name);

    done();
  });

  test('creating attachments without required fields should return an error', async (done) => {
    try {
      await Syandana.create({ colorScheme: await ColorScheme.create({}) });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.name).toBeDefined();
    }

    try {
      await Syandana.create({
        name: 'Test',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.colorScheme).toBeDefined();
    }

    done();
  });

  test('deleting syandana also deletes colorScheme', async (done) => {
    const syandana = await Syandana.create({
      name: 'Test',
      colorScheme: await ColorScheme.create({}),
    });

    await syandana.remove();

    const colorScheme = await ColorScheme.findById(syandana.colorScheme);

    expect(colorScheme).toBe(null);

    done();
  });
});
