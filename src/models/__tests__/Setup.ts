import { getTestAuthorId } from './../../testSetup';
import { setupTests } from '../../testSetup';
import ColorScheme from '../ColorScheme';
import mongoose from 'mongoose';
import Syandana from '../Syandana';
import Setup from '../Setup';
import Attachments from '../Attachments';

jest.mock('../../config', () => ({ jwtKey: 'TestJwtKey' }));

describe('Setup model test', () => {
  setupTests();

  test('create setup successfully', async (done) => {
    const setupData = {
      name: 'Test',
      description: 'Test',
      frame: 'Test',
      helmet: 'Test',
      skin: 'Test',
      screenshot: 'test.com',
    };

    const validSetup = await Setup.create({
      author: await getTestAuthorId(),
      attachments: await Attachments.create({
        colorScheme: await ColorScheme.create({}),
      }),
      syandana: await Syandana.create({
        name: 'Test',
        colorScheme: await ColorScheme.create({}),
      }),
      colorScheme: await ColorScheme.create({}),
      ...setupData,
    });

    expect(validSetup._id).toBeDefined();
    expect(validSetup.description).toBe(validSetup.description);
    expect(validSetup.frame).toBe(validSetup.frame);
    expect(validSetup.helmet).toBe(validSetup.helmet);
    expect(validSetup.skin).toBe(validSetup.skin);
    expect(validSetup.screenshot).toBe(validSetup.screenshot);

    done();
  });

  test('creating setup without required fields should return an error', async (done) => {
    const userId = await getTestAuthorId();

    try {
      await Setup.create({
        author: userId,
        attachments: await Attachments.create({
          colorScheme: await ColorScheme.create({}),
        }),
        syandana: await Syandana.create({
          name: 'Test',
          colorScheme: await ColorScheme.create({}),
        }),
        colorScheme: await ColorScheme.create({}),
        description: 'Test',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.name).toBeDefined();
    }

    try {
      await Setup.create({
        author: userId,
        attachments: await Attachments.create({
          colorScheme: await ColorScheme.create({}),
        }),
        syandana: await Syandana.create({
          name: 'Test',
          colorScheme: await ColorScheme.create({}),
        }),
        colorScheme: await ColorScheme.create({}),
        name: 'Test',
        description: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.frame).toBeDefined();
    }

    try {
      await Setup.create({
        author: userId,
        attachments: await Attachments.create({
          colorScheme: await ColorScheme.create({}),
        }),
        syandana: await Syandana.create({
          name: 'Test',
          colorScheme: await ColorScheme.create({}),
        }),
        colorScheme: await ColorScheme.create({}),
        name: 'Test',
        description: 'Test',
        frame: 'Test',
        skin: 'Test',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.helmet).toBeDefined();
    }

    try {
      await Setup.create({
        author: userId,
        attachments: await Attachments.create({
          colorScheme: await ColorScheme.create({}),
        }),
        syandana: await Syandana.create({
          name: 'Test',
          colorScheme: await ColorScheme.create({}),
        }),
        colorScheme: await ColorScheme.create({}),
        name: 'Test',
        description: 'Test',
        frame: 'Test',
        helmet: 'Test',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.skin).toBeDefined();
    }

    done();
  });

  test('deleting setup also deletes attachments, syandana and colorScheme', async (done) => {
    const setup = await Setup.create({
      author: await getTestAuthorId(),
      attachments: await Attachments.create({
        colorScheme: await ColorScheme.create({}),
      }),
      syandana: await Syandana.create({
        name: 'Test',
        colorScheme: await ColorScheme.create({}),
      }),
      colorScheme: await ColorScheme.create({}),
      name: 'Test',
      frame: 'Test',
      helmet: 'Test',
      skin: 'Test',
    });

    await setup.remove();

    const attachments = await Attachments.findById(setup.attachments);
    const syandana = await Syandana.findById(setup.syandana);
    const colorScheme = await ColorScheme.findById(setup.colorScheme);

    expect(attachments).toBe(null);
    expect(syandana).toBe(null);
    expect(colorScheme).toBe(null);

    done();
  });

  test('creating setup with an invalid screenshot should return an error', async (done) => {
    try {
      await Setup.create({
        author: await getTestAuthorId(),
        attachments: await Attachments.create({
          colorScheme: await ColorScheme.create({}),
        }),
        syandana: await Syandana.create({
          name: 'Test',
          colorScheme: await ColorScheme.create({}),
        }),
        colorScheme: await ColorScheme.create({}),
        name: 'Test',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
        screenshot: 'InvalidScreenshotURL',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.screenshot).toBeDefined();
    }

    done();
  });

  test('creating setup with an existing name should return an error', async (done) => {
    try {
      await Setup.create({
        author: await getTestAuthorId(),
        attachments: await Attachments.create({
          colorScheme: await ColorScheme.create({}),
        }),
        syandana: await Syandana.create({
          name: 'Test',
          colorScheme: await ColorScheme.create({}),
        }),
        colorScheme: await ColorScheme.create({}),
        name: 'Test setup',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });
    } catch (e) {
      console.log(e);
      expect(e.code).toBe(11000);
    }

    done();
  });
});
