import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/HttpException';
import auth from '../auth';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

jest.mock('jsonwebtoken');
jest.mock('../../models/User');

describe('errorMiddleware', () => {
  test('passes an error on missing authHeader', async () => {
    const mockReq: Request = ({
      header: jest.fn(),
    } as unknown) as Request;
    const mockRes: Response = (jest.fn() as unknown) as Response;
    const mockNext: NextFunction = jest.fn() as NextFunction;

    await auth(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(
      new HttpException(401, 'JWT Token is missing')
    );
  });

  test('passes an error on an invalid token', async () => {
    const mockToken = 'InvalidToken';
    const mockAuthHeader = jest.fn(() => ({
      replace: jest.fn(() => mockToken),
    }));
    const mockReq: Request = ({
      header: mockAuthHeader,
    } as unknown) as Request;
    const mockRes: Response = (jest.fn() as unknown) as Response;
    const mockNext: NextFunction = jest.fn() as NextFunction;

    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error('jwt malformed');
    });

    await auth(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(
      new HttpException(401, `Access forbidden, jwt malformed`)
    );
  });

  test('passes an error on a non-existing user', async () => {
    const mockToken = 'ValidToken';
    const mockAuthHeader = jest.fn(() => ({
      replace: jest.fn(() => mockToken),
    }));
    const mockReq: Request = ({
      header: mockAuthHeader,
    } as unknown) as Request;
    const mockRes: Response = (jest.fn() as unknown) as Response;
    const mockNext: NextFunction = jest.fn() as NextFunction;

    jwt.verify = jest.fn().mockReturnValue('ValidToken');
    User.findOne = jest.fn().mockReturnValue(null);

    await auth(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(
      new HttpException(401, `Access forbidden, User does not exist`)
    );
  });

  test('assigns user and token on valid authorization', async () => {
    const mockReqUser = 'ValidUser';
    const mockReqToken = 'ValidToken';

    const mockAuthHeader = jest.fn(() => ({
      replace: jest.fn(() => mockReqToken),
    }));
    const mockReq: Request = ({
      header: mockAuthHeader,
    } as unknown) as Request;
    const mockRes: Response = (jest.fn() as unknown) as Response;
    const mockNext: NextFunction = jest.fn() as NextFunction;

    jwt.verify = jest.fn().mockReturnValue(mockReqToken);
    User.findOne = jest.fn().mockReturnValue(mockReqUser);

    await auth(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith();
    expect(mockReq.user).toBe(mockReqUser);
    expect(mockReq.token).toBe(mockReqToken);
  });
});
