import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import errorMiddleware from '../errorMiddleware';

describe('errorMiddleware', () => {
  test('handles error correctly with passed status and message', () => {
    const testStatus = 1000;
    const testMessage = 'TestError';
    const testHttpException = new HttpException(testStatus, testMessage);

    const mockReq: Request = (jest.fn() as unknown) as Request;

    const mockSend = jest.fn();
    const mockStatus = jest.fn(() => ({
      send: mockSend,
    }));
    const mockRes: Response = ({
      status: mockStatus,
    } as unknown) as Response;

    const mockNext: NextFunction = jest.fn() as NextFunction;

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
