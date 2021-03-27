/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpException from '../../exceptions/HttpException';
import errorMiddleware from '../errorMiddleware';

describe('errorMiddleware', () => {
  test('handles error correctly with passed status and message', () => {
    const testStatus = 1000;
    const testMessage = 'TestError';
    const testHttpException = new HttpException(testStatus, testMessage);

    const mockReq: any = jest.fn();

    const mockSend = jest.fn();
    const mockStatus = jest.fn(() => ({
      send: mockSend,
    }));
    const mockRes: any = {
      status: mockStatus,
    };

    const mockNext: any = jest.fn();

    const logSpy = jest.spyOn(global.console, 'log');

    errorMiddleware(testHttpException, mockReq, mockRes, mockNext);

    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(
      `Received status: ${testStatus}, error: ${testMessage}`
    );

    expect(mockStatus).toBeCalledTimes(1);
    expect(mockStatus).toBeCalledWith(testStatus);

    expect(mockSend).toBeCalledTimes(1);
    expect(mockSend).toBeCalledWith({
      message: testMessage,
    });
  });
});
