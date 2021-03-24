import { setupDB } from './../../testSetup';
import supertest from 'supertest';
import app from '../../app';
import User from '../../models/User';

const request = supertest(app);

const authUrl = '/users';

describe('Test auth register route', () => {
  setupDB();

  test('should register with valid credentials', async (done) => {
    const res = await request.post(`${authUrl}/`).send({
      username: 'TestUsername2',
      email: 'Test2@gmail.com',
      password: 'TestPassword',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    done();
  });
});

describe('Test auth login route', () => {
  setupDB();

  test('should login with valid credentials', async (done) => {
    const res = await request.post(`${authUrl}/login`).send({
      username: 'TestUsername',
      password: 'TestPassword',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    done();
  });

  test('should return error for invalid user', async (done) => {
    const res = await request.post(`${authUrl}/login`).send({
      username: 'InvalidUsername',
      password: 'TestPassword',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('User does not exist');
    done();
  });

  test('should return error for invalid password', async (done) => {
    const res = await request.post(`${authUrl}/login`).send({
      username: 'TestUsername',
      password: 'InvalidPassword',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Password do not match');
    done();
  });
});

describe('Test auth own profile route', () => {
  setupDB();

  test('should return valid profile', async (done) => {
    const loginRes = await request.post(`${authUrl}/login`).send({
      username: 'TestUsername',
      password: 'TestPassword',
    });

    const userId: string = loginRes.body.user._id;
    const token: string = loginRes.body.token;

    const myProfileRes = await request
      .get(`${authUrl}/me`)
      .set({ Authorization: `Bearer ${token}` });

    const user = await User.findOne({
      _id: userId,
      'tokens.token': token,
    });

    expect(user).toBeTruthy();
    expect(myProfileRes.status).toBe(200);
    expect(myProfileRes.body.data.username).toBe(user?.username);

    done();
  });

  test('should return an error for an invalid token', async (done) => {
    const myProfileRes = await request
      .get(`${authUrl}/me`)
      .set({ Authorization: 'Bearer Invalid token' });

    expect(myProfileRes.status).toBe(401);
    expect(myProfileRes.body.message).toBe('Access forbidden');

    done();
  });

  test('should return an error for a missing token', async (done) => {
    const myProfileRes = await request.get(`${authUrl}/me`);

    expect(myProfileRes.status).toBe(401);
    expect(myProfileRes.body.message).toBe('JWT Token is missing');

    done();
  });
});

describe('Test auth logout route', () => {
  setupDB();

  test('should logout with valid token', async (done) => {
    const loginRes = await request.post(`${authUrl}/login`).send({
      username: 'TestUsername',
      password: 'TestPassword',
    });

    const token: string = loginRes.body.token;

    const logoutRes = await request
      .post(`${authUrl}/me/logout`)
      .set({ Authorization: `Bearer ${token}` });

    expect(logoutRes.status).toBe(200);

    done();
  });

  test('should return an error for an invalid token', async (done) => {
    const logoutRes = await request
      .post(`${authUrl}/me/logout`)
      .set({ Authorization: `Bearer Invalid Token` });

    expect(logoutRes.status).toBe(401);
    expect(logoutRes.body.message).toBe('Access forbidden');

    done();
  });

  test('should return an error for a missing token', async (done) => {
    const logoutRes = await request.post(`${authUrl}/me/logout`);

    expect(logoutRes.status).toBe(401);
    expect(logoutRes.body.message).toBe('JWT Token is missing');

    done();
  });
});
