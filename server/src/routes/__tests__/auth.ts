import {
  authorizedRequest,
  setupTests,
  getTestAuthor,
} from './../../testSetup';
import supertest from 'supertest';
import app from '../../app';
import User from '../../models/User';

jest.mock('../../config', () => ({ jwtKey: 'TestJwtKey' }));

const request = supertest(app);

const authUrl = '/users';

describe('Test auth middleware', () => {
  setupTests();

  test('should return an error for a missing token', async (done) => {
    const myProfileRes = await request.get(`${authUrl}/me`);

    expect(myProfileRes.status).toBe(401);
    expect(myProfileRes.body.message).toBe('JWT Token is missing');

    done();
  });
});

describe('Test auth register route', () => {
  setupTests();

  test('should register with valid credentials', async (done) => {
    const res = await request.post(`${authUrl}/`).send({
      username: 'TestUsername3',
      email: 'Test3@gmail.com',
      password: 'TestPassword',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');

    done();
  });

  test('should catch an error correctly', async (done) => {
    const testMsg = 'TestException';

    const userCreateSpy = jest
      .spyOn(User, 'create')
      .mockImplementationOnce(() => Promise.reject({ message: testMsg }));

    const res = await request.post(`${authUrl}/`).send({
      username: 'TestUsername',
      email: 'Test@gmail.com',
      password: 'TestPassword',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(testMsg);

    userCreateSpy.mockRestore();

    done();
  });
});

describe('Test auth login route', () => {
  setupTests();

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

  test('should catch an error correctly', async (done) => {
    const testMsg = 'TestException';

    const userFindSpy = jest
      .spyOn(User, 'findByCredentials')
      .mockImplementationOnce(() => Promise.reject({ message: testMsg }));

    const res = await request.post(`${authUrl}/login`).send({
      username: 'TestUsername',
      password: 'InvalidPassword',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(testMsg);

    userFindSpy.mockRestore();

    done();
  });
});

describe('Test auth own profile route', () => {
  setupTests();

  test('should return valid profile', async (done) => {
    const myProfileRes = await request
      .get(`${authUrl}/me`)
      .set(await authorizedRequest());

    const user = await getTestAuthor();

    expect(user).toBeTruthy();
    expect(myProfileRes.status).toBe(200);
    expect(myProfileRes.body.data.username).toBe(user?.username);

    done();
  });
});

describe('Test auth logout route', () => {
  setupTests();

  test('should logout with valid token', async (done) => {
    const logoutRes = await request
      .post(`${authUrl}/me/logout`)
      .set(await authorizedRequest());

    expect(logoutRes.status).toBe(200);

    done();
  });
});
