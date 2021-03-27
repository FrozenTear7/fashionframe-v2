/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpException from '../../exceptions/HttpException';
import validObjectId from '../validObjectId';

describe('errorMiddleware', () => {
  test('calls next correctly for no params', () => {
    const mockReq: any = jest.fn();
    mockReq.params = {};

    const mockRes: any = jest.fn();
    const mockNext: any = jest.fn();

    validObjectId(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith();
  });

  test('calls next correctly with valid id params', () => {
    const mockReq: any = jest.fn();
    mockReq.params = {
      userId: '0'.repeat(24),
    };

    const mockRes: any = jest.fn();
    const mockNext: any = jest.fn();

    validObjectId(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith();
  });

  test('calls next with an exception for incorrect id upperCase', () => {
    const mockReq: any = jest.fn();
    mockReq.params = {
      userId: 'InvalidId',
    };

    const mockRes: any = jest.fn();
    const mockNext: any = jest.fn();

    validObjectId(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(
      new HttpException(400, 'Provided ID is invalid')
    );
  });
});
