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
  const { token } = req.cookies;

  if (!token) return next(new HttpException(401, 'JWT Token is missing'));

  try {
    const data = jwt.verify(token, config.jwtKey);

    const user = await User.findOne({
      _id: data,
      'tokens.token': token,
    });

    if (!user) throw new Error('User does not exist');

    req.user = user;

    next();
  } catch (e) {
    console.log(e);
    next(new HttpException(401, `Access forbidden, ${(e as Error).message}`));
  }
};

export default auth;
