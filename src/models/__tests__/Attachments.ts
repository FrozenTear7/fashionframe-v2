import { setupTests } from '../../testSetup';
import Attachments from '../Attachments';
import ColorScheme from '../ColorScheme';
import mongoose from 'mongoose';

jest.mock('../../config', () => ({ jwtKey: 'TestJwtKey' }));

describe('Attachments model test', () => {
  setupTests();

  test('create attachments successfully', async () => {
    const attachmentsData = {
      chest: 'Test',
      leftArm: 'Test',
      rightArm: 'Test',
      leftLeg: 'Test',
      rightLeg: 'Test',
      ephemera: 'Test',
    };

    const validAttachments = await Attachments.create({
      colorScheme: await ColorScheme.create({}),
      ...attachmentsData,
    });

    expect(validAttachments._id).toBeDefined();
    expect(validAttachments.chest).toBe(attachmentsData.chest);
    expect(validAttachments.leftArm).toBe(attachmentsData.leftArm);
    expect(validAttachments.rightArm).toBe(attachmentsData.rightArm);
    expect(validAttachments.leftLeg).toBe(attachmentsData.leftLeg);
    expect(validAttachments.rightLeg).toBe(attachmentsData.rightLeg);
    expect(validAttachments.ephemera).toBe(attachmentsData.ephemera);
  });

  test('creating attachments without required fields should return an error', async () => {
    try {
      await Attachments.create({
        chest: 'Test',
        leftArm: 'Test',
        rightArm: 'Test',
        leftLeg: 'Test',
        rightLeg: 'Test',
        ephemera: 'Test',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.colorScheme).toBeDefined();
    }
  });

  test('deleting attachments also deletes colorScheme', async () => {
    const attachments = await Attachments.create({
      colorScheme: await ColorScheme.create({}),
    });

    await attachments.remove();

    const colorScheme = await ColorScheme.findById(attachments.colorScheme);

    expect(colorScheme).toBe(null);
  });
});
