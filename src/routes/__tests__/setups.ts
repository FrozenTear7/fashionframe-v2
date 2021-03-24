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

    const setup = await Setup.findOne({ user: userId });

    const res = await request
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .delete(`${setupsUrl}/${setup?._id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(200);
    done();
  });
});
