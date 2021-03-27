import bcrypt from 'bcryptjs';
import { setupTests } from '../../testSetup';
import mongoose from 'mongoose';
import User from '../User';

jest.mock('../../config', () => ({ jwtKey: 'TestJwtKey' }));

describe('User model test', () => {
  setupTests();

  test('create user successfully', async (done) => {
    const userData = {
      username: 'TestTestTest',
      email: 'test@test.com',
      password: 'TestTestTest',
    };

    const validUser = await User.create(userData);

    expect(validUser._id).toBeDefined();
    expect(validUser.username).toBe(userData.username);
    expect(validUser.email).toBe(userData.email);
    expect(await bcrypt.compare(userData.password, validUser.password)).toBe(
      true
    );

    done();
  });

  test('creating user without required fields should return an error', async (done) => {
    try {
      await User.create({
        email: 'test@test.com',
        password: 'TestTestTest',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.username).toBeDefined();
    }

    try {
      await User.create({
        username: 'TestTestTest',
        password: 'TestTestTest',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.email).toBeDefined();
    }

    try {
      await User.create({
        username: 'TestTestTest',
        email: 'test@test.com',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.password).toBeDefined();
    }

    done();
  });

  test('creating user should trim the username', async (done) => {
    const userData = {
      username: '  TestTestTest  ',
      email: 'test@test.com',
      password: 'TestTestTest',
    };

    const validUser = await User.create(userData);

    expect(validUser.username).toBe('TestTestTest');

    done();
  });

  test('creating user with username or password too short should return an error', async (done) => {
    try {
      await User.create({
        username: 'Test',
        email: 'test@test.com',
        password: 'TestTestTest',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.username).toBeDefined();
    }

    try {
      await User.create({
        username: 'TestTestTest',
        email: 'test@test.com',
        password: 'Test',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.password).toBeDefined();
    }

    done();
  });

  test('creating user with and existing username or email should return an error', async (done) => {
    try {
      await User.create({
        username: 'TestUsername',
        email: 'TestDifferent@gmail.com',
        password: 'TestPassword',
      });
    } catch (e) {
      console.log(e);
      expect(e.code).toBe(11000);
    }

    try {
      await User.create({
        username: 'TestTestTest',
        email: 'test@gmail.com',
        password: 'TestPassword',
      });
    } catch (e) {
      console.log(e);
      expect(e.code).toBe(11000);
    }

    done();
  });

  test('creating user should clean the email', async (done) => {
    const userData = {
      username: 'TestTestTest',
      email: 'TeSt@TEST.Com',
      password: 'TestTestTest',
    };

    const validUser = await User.create(userData);

    expect(validUser.username).toBe(userData.username);
    expect(validUser.email).toBe(userData.email.toLowerCase());

    done();
  });

  test('correctly find user by credentials', async (done) => {
    const userData = {
      username: 'TestTestTest',
      email: 'TeSt@TEST.Com',
      password: 'TestTestTest',
    };

    const validUser = await User.create(userData);
    const userByCredentials = await User.findByCredentials(
      userData.username,
      userData.password
    );

    expect(validUser.username).toBe(userByCredentials.username);

    done();
  });

  test('creating user with an invalid email should return an error', async (done) => {
    try {
      await User.create({
        username: 'TestTestTest',
        email: 'InvalidEmail',
        password: 'TestTestTest',
      });
    } catch (e) {
      console.log(e);
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(e.errors.email).toBeDefined();
    }

    done();
  });
});
