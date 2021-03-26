import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import HttpException from '../exceptions/HttpException';

const validObjectId = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  for (const key in req.params) {
    if (/^.*id.*$/.test(key.toLowerCase()))
      try {
        Types.ObjectId(req.params[key]);
      } catch (e) {
        next(new HttpException(400, 'Provided ID is invalid'));
      }
  }

  next();
};

export default validObjectId;
