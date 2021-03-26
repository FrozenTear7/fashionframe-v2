import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const errorMiddleware = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status;
  const message = err.message;

  console.log(`Received status: ${status}, error: ${message}`);

  res.status(status).send({
    message,
  });
};

export default errorMiddleware;
