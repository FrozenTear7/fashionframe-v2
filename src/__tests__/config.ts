/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

describe('config', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      PORT: 'test',
      DB_URL_PROD: 'test',
      DB_URL_DEV: 'test',
      NODE_ENV: 'production',
      JWT_KEY: 'test',
      IMGUR_ID: 'test',
      IMGUR_SECRET: 'test',
      IMGUR_ALBUM: 'test',
      IMGUR_TOKEN: 'test',
    };
  });

  test('exits on missing or non-string variables', () => {
    const exitMsg = 'mock process.exit(0)';
    const logSpy = jest.spyOn(global.console, 'log');
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error(exitMsg);
    });

    const valuesToTest = [
      'PORT',
      'NODE_ENV',
      'DB_URL_PROD',
      'DB_URL_DEV',
      'JWT_KEY',
      'IMGUR_ID',
      'IMGUR_SECRET',
      'IMGUR_ALBUM',
      'IMGUR_TOKEN',
    ];

    const testEnv = {
      PORT: 'test',
      DB_URL_PROD: 'test',
      DB_URL_DEV: 'test',
      NODE_ENV: 'test',
      JWT_KEY: 'test',
      IMGUR_ID: 'test',
      IMGUR_SECRET: 'test',
      IMGUR_ALBUM: 'test',
      IMGUR_TOKEN: 'test',
    };

    for (const valueToTest of valuesToTest) {
      process.env = testEnv;
      process.env[valueToTest] = undefined;

      try {
        require('../../src/config').default;
      } catch (e) {
        expect((e as Error).message).toBe(exitMsg);
      }

      expect(logSpy).toBeCalledTimes(1);
      expect(logSpy).toBeCalledWith('Please provide a valid .env config');

      expect(exitSpy).toBeCalledTimes(1);
      expect(exitSpy).toBeCalledWith(0);
    }
  });

  test('returns valid config', () => {
    const apiUrl = 'https://fashionframe.herokuapp.com/fashionframe';
    const webUrl = 'https://fashionframe.herokuapp.com';

    const config = require('../../src/config').default;
    console.log(config);
    const configCheck = {
      port: process.env.PORT,
      apiUrl: apiUrl,
      webUrl: webUrl,
      database: process.env.DB_URL_PROD,
      jwtKey: process.env.JWT_KEY,
      imgur: {
        id: process.env.IMGUR_ID,
        secret: process.env.IMGUR_SECRET,
        album: process.env.IMGUR_ALBUM,
        refreshToken: process.env.IMGUR_TOKEN,
      },
    };

    expect(config).toStrictEqual(configCheck);
  });

  test('returns valid URLs depending for development', () => {
    const devApiUrl = 'http://localhost:3000/fashionframe';
    const devWebUrl = 'http://localhost:3001';

    process.env.NODE_ENV = 'development';

    const config = require('../../src/config').default;

    expect(config.apiUrl).toBe(devApiUrl);
    expect(config.webUrl).toBe(devWebUrl);
  });

  test('returns valid URLs depending for production', () => {
    const prodApiUrl = 'https://fashionframe.herokuapp.com/fashionframe';
    const prodWebUrl = 'https://fashionframe.herokuapp.com';

    process.env.NODE_ENV = 'production';

    const config = require('../../src/config').default;

    expect(config.apiUrl).toBe(prodApiUrl);
    expect(config.webUrl).toBe(prodWebUrl);
  });

  test('returns valid database depending for development', () => {
    const dbUrlDev = 'test DB URL development';

    process.env.NODE_ENV = 'development';
    process.env.DB_URL_DEV = dbUrlDev;

    const config = require('../../src/config').default;

    expect(config.database).toBe(dbUrlDev);
  });

  test('returns valid database depending for production', () => {
    const dbUrlProd = 'test DB URL production';

    process.env.NODE_ENV = 'production';
    process.env.DB_URL_PROD = dbUrlProd;

    const config = require('../../src/config').default;

    expect(config.database).toBe(dbUrlProd);
  });
});
