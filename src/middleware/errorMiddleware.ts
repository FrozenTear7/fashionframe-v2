import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  console.log(`Received status: ${status}, error: ${message}`);

  res.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
