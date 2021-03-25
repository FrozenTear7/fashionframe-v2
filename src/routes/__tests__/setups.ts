/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ObjectId } from 'mongoose';
import { setupDB } from './../../testSetup';
import supertest from 'supertest';
import app from '../../app';
import Setup from '../../models/Setup';

const request = supertest(app);

const authUrl = '/users';
const setupsUrl = '/setups';

describe('Test setups delete route', () => {
  setupDB();

  test('should delete if authorized', async (done) => {
    const loginRes = await request.post(`${authUrl}/login`).send({
      username: 'TestUsername',
      password: 'TestPassword',
    });

    const userId: ObjectId = loginRes.body.user._id;
    const token: string = loginRes.body.token;

    const setup = await Setup.findOne({ author: userId });

    const deleteRes = await request
      .delete(`${setupsUrl}/${setup?._id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(deleteRes.status).toBe(200);

    done();
  });

  test('should return an error if setup does not exist', async (done) => {
    const loginRes = await request.post(`${authUrl}/login`).send({
      username: 'TestUsername',
      password: 'TestPassword',
    });

    const token: string = loginRes.body.token;

    const deleteRes = await request
      .delete(`${setupsUrl}/InvalidId`)
      .set({ Authorization: `Bearer ${token}` });

    expect(deleteRes.status).toBe(404);
    expect(deleteRes.body.message).toBe('Error while deleting setup');

    done();
  });
});
