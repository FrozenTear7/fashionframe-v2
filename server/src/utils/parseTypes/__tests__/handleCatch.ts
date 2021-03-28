import { handleCatch } from './../handleCatch';

describe('handleCatch', () => {
  test('handles an Error correctly', (done) => {
    const logMsg = 'test';
    const testErrorMsg = 'test message';
    const testError = new Error(testErrorMsg);

    const logSpy = jest.spyOn(global.console, 'log');

    handleCatch(logMsg, testError);

    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(`${logMsg}: ${testErrorMsg}`);

    done();
  });

  test('handles an string correctly', (done) => {
    const logMsg = 'test';
    const testErrorMsg = 'test message';

    const logSpy = jest.spyOn(global.console, 'log');

    handleCatch(logMsg, testErrorMsg);

    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(`${logMsg}: ${testErrorMsg}`);

    done();
  });

  test('rethrows anything else', (done) => {
    const logMsg = 'test';
    const otherError = undefined;

    const logSpy = jest.spyOn(global.console, 'log');

    try {
      expect(handleCatch(logMsg, otherError)).toThrowError(otherError);
    } catch (e) {
      expect(logSpy).toBeCalledTimes(0);
    }

    done();
  });
});
