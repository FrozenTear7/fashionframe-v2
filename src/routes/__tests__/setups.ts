/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  authorizedRequest,
  getTestAuthorId,
  getTestAuthor,
} from './../../testSetup';
import { setupDB } from './../../testSetup';
import supertest from 'supertest';
import app from '../../app';
import Setup from '../../models/Setup';
import User from '../../models/User';
import Syandana from '../../models/Syandana';

const request = supertest(app);

const setupsUrl = '/setups';

describe('Test createSetup', () => {
  setupDB();

  test('should create correct setup', async (done) => {
    const res = await request
      .post(`${setupsUrl}/`)
      .set(await authorizedRequest())
      .send({
        author: await getTestAuthorId(),
        attachments: {
          colorScheme: {},
        },
        syandana: {
          name: 'Test',
          colorScheme: {},
        },
        colorScheme: {},
        name: 'Test2',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });

    const { data: createdSetup } = res.body;

    expect(createdSetup._id).toBeDefined();

    done();
  });

  test('should return an error if setup is missing sub-elements', async (done) => {
    const missingAttachmentsRes = await request
      .post(`${setupsUrl}/`)
      .set(await authorizedRequest())
      .send({
        author: await getTestAuthorId(),
        syandana: {
          name: 'Test',
          colorScheme: {},
        },
        colorScheme: {},
        name: 'Test2',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });

    expect(missingAttachmentsRes.status).toBe(400);
    expect(missingAttachmentsRes.body.message).toBe(
      'Setup validation failed: attachments: Attachments is required'
    );

    const missingSyandanaRes = await request
      .post(`${setupsUrl}/`)
      .set(await authorizedRequest())
      .send({
        author: await getTestAuthorId(),
        attachments: {
          colorScheme: {},
        },
        colorScheme: {},
        name: 'Test2',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });

    expect(missingSyandanaRes.status).toBe(400);
    expect(missingSyandanaRes.body.message).toBe(
      'Setup validation failed: syandana: Syandana is required'
    );

    const missingColorSchemeRes = await request
      .post(`${setupsUrl}/`)
      .set(await authorizedRequest())
      .send({
        author: await getTestAuthorId(),
        attachments: {
          colorScheme: {},
        },
        syandana: {
          name: 'Test',
          colorScheme: {},
        },
        name: 'Test2',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });

    expect(missingColorSchemeRes.status).toBe(400);
    expect(missingColorSchemeRes.body.message).toBe(
      'Setup validation failed: colorScheme: ColorScheme is required'
    );

    done();
  });

  test('should return an error and cancel transaction on sub-element error', async (done) => {
    const setupsBefore = await Setup.find({});
    const syandanasBefore = await Syandana.find({});

    const missingAttachmentsRes = await request
      .post(`${setupsUrl}/`)
      .set(await authorizedRequest())
      .send({
        author: await getTestAuthorId(),
        syandana: {
          name: 'Test',
          colorScheme: {},
        },
        colorScheme: { primary: 'InvalidRGB' },
        name: 'Test2',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });

    const setupsAfter = await Setup.find({});
    const syandanasAfter = await Syandana.find({});

    expect(missingAttachmentsRes.status).toBe(400);
    expect(setupsBefore.length).toBe(setupsAfter.length); // Setup was not created
    expect(syandanasBefore.length).toBe(syandanasAfter.length); // Syandana created before ColorScheme should also be rolled back

    done();
  });
});

describe('Test getSetupsByUserId', () => {
  setupDB();

  test('should fetch correct setups', async (done) => {
    const user = await getTestAuthor();
    const setups = await Setup.find({ user: user._id });

    const res = await request.get(`${setupsUrl}/user/${user._id}`);
    const { data: fetchedSetups } = res.body;

    expect(
      fetchedSetups.map((setup: { _id: unknown }) => String(setup._id))
    ).toStrictEqual(setups.map((setup) => String(setup._id)));

    done();
  });

  test('should return an error if user does not exist', async (done) => {
    const res = await request.get(`${setupsUrl}/user/${'0'.repeat(24)}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User does not exist');

    done();
  });
});

describe('Test getSetupById', () => {
  setupDB();

  test('should fetch correct setup', async (done) => {
    const setups = await Setup.find({});

    const res = await request.get(`${setupsUrl}/${setups[0]?._id}`);
    const { data: fetchedSetup } = res.body;

    expect(fetchedSetup._id).toBeDefined();
    expect(String(fetchedSetup._id)).toStrictEqual(String(setups[0]?._id));

    done();
  });

  test('should return an error if setup does not exist', async (done) => {
    const res = await request.get(`${setupsUrl}/${'0'.repeat(24)}`);

    console.log(res.body);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Setup does not exist');

    done();
  });
});

describe('Test updateSetupById', () => {
  setupDB();

  test('should update correct setup', async (done) => {
    const setups = await Setup.find({});
    const newSetupName = setups[0].name + 'Edited';

    const res = await request
      .put(`${setupsUrl}/${setups[0]._id}`)
      .set(await authorizedRequest())
      .send({
        author: await getTestAuthorId(),
        attachments: {
          colorScheme: {},
        },
        syandana: {
          name: 'Test',
          colorScheme: {},
        },
        colorScheme: {},
        name: newSetupName,
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
      });

    const { data: updatedSetup } = res.body;

    expect(updatedSetup.name).toBe(newSetupName);

    done();
  });

  test('should return an error if update data is invalid', async (done) => {
    const setups = await Setup.find({});

    const res = await request
      .put(`${setupsUrl}/${setups[0]._id}`)
      .set(await authorizedRequest())
      .send({
        author: await getTestAuthorId(),
        attachments: {
          colorScheme: {},
        },
        syandana: {
          name: 'Test',
          colorScheme: {},
        },
        colorScheme: {},
        name: 'Test',
        frame: 'Test',
        helmet: 'Test',
        skin: 'Test',
        screenshot: 'InvalidURL',
      });

    expect(res.status).toBe(400);

    done();
  });
});

describe('Test likeSetupById', () => {
  setupDB();

  test('should like if authorized', async (done) => {
    const userId = await getTestAuthorId();

    const setup = await Setup.findOne({ author: userId });

    const likeRes = await request
      .post(`${setupsUrl}/${setup?._id}/like`)
      .set(await authorizedRequest());

    const user = await User.findByCredentials('TestUsername', 'TestPassword');
    const updatedSetup = await Setup.findOne({ author: userId });

    expect(likeRes.status).toBe(200);
    expect(user.likedSetups).toContainEqual(setup?._id);
    expect(updatedSetup?.likedUsers).toContainEqual(user?._id);

    done();
  });

  test('should return an error if setup does not exist', async (done) => {
    const likeRes = await request
      .post(`${setupsUrl}/${'0'.repeat(24)}/like`)
      .set(await authorizedRequest());

    expect(likeRes.status).toBe(404);
    expect(likeRes.body.message).toBe('Setup does not exist');

    done();
  });
});

describe('Test deleteSetupById', () => {
  setupDB();

  test('should delete if authorized', async (done) => {
    const userId = await getTestAuthorId();

    const setup = await Setup.findOne({ author: userId });

    const deleteRes = await request
      .delete(`${setupsUrl}/${setup?._id}`)
      .set(await authorizedRequest());

    expect(deleteRes.status).toBe(200);

    done();
  });

  test('should return an error if setup does not exist', async (done) => {
    const deleteRes = await request
      .delete(`${setupsUrl}/${'0'.repeat(24)}`)
      .set(await authorizedRequest());

    expect(deleteRes.status).toBe(404);
    expect(deleteRes.body.message).toBe('Setup does not exist');

    done();
  });
});
