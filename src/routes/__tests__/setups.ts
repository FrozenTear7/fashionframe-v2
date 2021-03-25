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

  test('should return an error if setup is invalid', async (done) => {
    const res = await request
      .post(`${setupsUrl}/`)
      .set(await authorizedRequest())
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Error while creating setup');

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
    const res = await request.get(`${setupsUrl}/user/InvalidId`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Error while fetching setups');

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
    const res = await request.get(`${setupsUrl}/InvalidId`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Error while fetching setup');

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
    expect(res.body.message).toBe('Error while updating setup');

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
      .post(`${setupsUrl}/InvalidId/like`)
      .set(await authorizedRequest());

    expect(likeRes.status).toBe(404);
    expect(likeRes.body.message).toBe('Error while liking setup');

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

  test('should return an error if id is invalid', async (done) => {
    const deleteRes = await request
      .delete(`${setupsUrl}/InvalidId`)
      .set(await authorizedRequest());

    expect(deleteRes.status).toBe(400);
    expect(deleteRes.body.message).toBe('Error while deleting setup');

    done();
  });
});
