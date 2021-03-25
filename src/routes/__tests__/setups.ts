/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { authorizedRequest, getTestAuthorId } from './../../testSetup';
import { setupDB } from './../../testSetup';
import supertest from 'supertest';
import app from '../../app';
import Setup from '../../models/Setup';
import User from '../../models/User';

const request = supertest(app);

const setupsUrl = '/setups';

describe('Test setups like route', () => {
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

describe('Test setups delete route', () => {
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

    expect(deleteRes.status).toBe(404);
    expect(deleteRes.body.message).toBe('Error while deleting setup');

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
