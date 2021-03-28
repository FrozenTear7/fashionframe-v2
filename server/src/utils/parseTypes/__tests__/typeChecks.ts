import { isObject } from './../typeChecks';
import { isString, isNumber, isArray, exists } from '../typeChecks';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('isString', () => {
  test('string returns true', (done) => {
    const valuesToTest = ['test', String('test'), String(1)];

    valuesToTest.forEach((valueToTest) =>
      expect(isString(valueToTest)).toBe(true)
    );

    done();
  });

  test('non-string values return false', (done) => {
    const valuesToTest = [null, undefined, 1, [], ['test']];

    valuesToTest.forEach((valueToTest) =>
      expect(isString(valueToTest)).toBe(false)
    );

    done();
  });
});

describe('isNumber', () => {
  test('number returns true', (done) => {
    const valuesToTest = [1, Number(1), Number('1')];

    valuesToTest.forEach((valueToTest) =>
      expect(isNumber(valueToTest)).toBe(true)
    );

    done();
  });

  test('non-number values return false', (done) => {
    const valuesToTest = [null, undefined, 'test', [], [1]];

    valuesToTest.forEach((valueToTest) =>
      expect(isNumber(valueToTest)).toBe(false)
    );

    done();
  });
});

describe('isArray', () => {
  test('valid arrays return true', (done) => {
    const valuesToTest = [[], Array(5), ['test']];

    valuesToTest.forEach((valueToTest) => {
      expect(isArray(valueToTest)).toBe(true);
    });

    done();
  });

  test('non-arrays return false', (done) => {
    const valuesToTest = [null, undefined, 'test', 1, {}];

    valuesToTest.forEach((valueToTest) =>
      expect(isArray(valueToTest)).toBe(false)
    );

    done();
  });
});

describe('isObject', () => {
  test('valid objects return true', (done) => {
    const valuesToTest = [{}, { test: 1 }];

    valuesToTest.forEach((valueToTest) => {
      expect(isObject(valueToTest)).toBe(true);
    });

    done();
  });

  test('non-objects return false', (done) => {
    const valuesToTest = ['test', 1, null, undefined];

    valuesToTest.forEach((valueToTest) =>
      expect(isObject(valueToTest)).toBe(false)
    );

    done();
  });
});

describe('exists', () => {
  test('null and undefined return true', (done) => {
    const valuesToTest = [null, undefined];

    valuesToTest.forEach((valueToTest) =>
      expect(exists(valueToTest)).toBe(false)
    );

    done();
  });

  test('anything else return false', (done) => {
    const valuesToTest = [
      'test',
      1,
      [],
      ['test'],
      Array(3),
      {},
      (): void => {
        console.log('test');
      },
    ];

    valuesToTest.forEach((valueToTest) =>
      expect(exists(valueToTest)).toBe(true)
    );

    done();
  });
});
