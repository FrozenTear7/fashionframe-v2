import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import HttpException from '../exceptions/HttpException';
import User from '../models/User';

const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header('Authorization');

  if (!authHeader) return next(new HttpException(401, 'JWT Token is missing'));

  const token = authHeader.replace('Bearer ', '');

  try {
    const data = jwt.verify(token, config.jwtKey);

    const user = await User.findOne({
      _id: data,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(new HttpException(401, 'Access forbidden'));
  }
};

export default auth;
