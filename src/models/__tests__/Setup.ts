import { setupDB } from '../../testSetup';
import ColorScheme from '../ColorScheme';
import mongoose from 'mongoose';
import Syandana from '../Syandana';
import Setup from '../Setup';
import Attachments from '../Attachments';
import User from '../User';

describe('Setup model test', () => {
  setupDB();

  test('create setup successfully', async () => {
    const setupData = {
      name: 'Test',
      description: 'Test',
      frame: 'Test',
      helmet: 'Test',
      skin: 'Test',
      screenshot: 'test.com',
    };
    const user = await User.findByCredentials('TestUsername', 'TestPassword');

    const validSetup = await Setup.create({
      author: user?._id,
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
  });

  test('creating setup without required fields should return an error', async () => {
    const user = await User.findByCredentials('TestUsername', 'TestPassword');

    try {
      await Setup.create({
        author: user?._id,
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
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.name).toBeDefined();
    }

    try {
      await Setup.create({
        author: user?._id,
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
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.frame).toBeDefined();
    }

    try {
      await Setup.create({
        author: user?._id,
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
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.helmet).toBeDefined();
    }

    try {
      await Setup.create({
        author: user?._id,
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
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.skin).toBeDefined();
    }
  });

  test('deleting setup also deletes attachments, syandana and colorScheme', async () => {
    const user = await User.findByCredentials('TestUsername', 'TestPassword');

    const setup = await Setup.create({
      author: user?._id,
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
  });

  test('creating setup with an invalid screenshot should return an error', async () => {
    const user = await User.findByCredentials('TestUsername', 'TestPassword');

    try {
      await Setup.create({
        author: user?._id,
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
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.screenshot).toBeDefined();
    }
  });
});
