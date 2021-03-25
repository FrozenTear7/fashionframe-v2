/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
describe('config', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  test('exits on missing or non-string variables', () => {
    const exitMsg = 'mock process.exit(0)';
    const logSpy = jest.spyOn(global.console, 'log');
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error(exitMsg);
    });

    process.env.PORT = undefined;

    try {
      require('../../src/config').default;
    } catch (e) {
      expect((e as Error).message).toBe(exitMsg);
    }

    process.env.NODE_ENV = undefined;

    try {
      require('../../src/config').default;
    } catch (e) {
      expect((e as Error).message).toBe(exitMsg);
    }

    process.env.DB_URL = undefined;

    try {
      require('../../src/config').default;
    } catch (e) {
      expect((e as Error).message).toBe(exitMsg);
    }

    process.env.JWT_KEY = undefined;

    try {
      require('../../src/config').default;
    } catch (e) {
      expect((e as Error).message).toBe(exitMsg);
    }

    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith('Please provide a valid .env config');

    expect(exitSpy).toBeCalledTimes(1);
    expect(exitSpy).toBeCalledWith(0);
  });

  test('returns valid config', () => {
    const port = '8001';
    const apiUrl = 'https://fashionframe.herokuapp.com/fashionframe';
    const webUrl = 'https://fashionframe.herokuapp.com';
    const dbUrlProd = 'test DB URL production';
    const dbUrlDev = 'test DB URL development';
    const jwtKey = 'TeStJWTKeY';

    process.env.PORT = port;
    process.env.DB_URL_PROD = dbUrlProd;
    process.env.DB_URL_DEV = dbUrlDev;
    process.env.NODE_ENV = 'production';
    process.env.JWT_KEY = jwtKey;

    const config = require('../../src/config').default;
    const configCheck = {
      port: port,
      apiUrl: apiUrl,
      webUrl: webUrl,
      database: {
        production: dbUrlProd,
        development: dbUrlDev,
      },
      jwtKey: jwtKey,
    };

    expect(config).toStrictEqual(configCheck);
  });

  test('returns valid URLs for development', () => {
    const apiUrl = 'http://localhost:8000/fashionframe';
    const webUrl = 'http://localhost:8001';

    process.env.NODE_ENV = 'development';

    const config = require('../../src/config').default;

    expect(config.apiUrl).toBe(apiUrl);
    expect(config.webUrl).toBe(webUrl);
  });
});
