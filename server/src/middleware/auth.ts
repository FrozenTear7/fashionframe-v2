import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import User from '../models/User';
import decodeJwt from '../utils/decodeJwt';

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.cookies;

  if (!token) return next(new HttpException(401, 'JWT Token is missing'));

  try {
    const userId = await decodeJwt(token);

    const user = await User.findOne({
      _id: userId,
      'tokens.token': token,
    });

    if (!user) throw new Error('User does not exist');

    req.user = user;

    next();
  } catch (e) {
    res.clearCookie('token');
    next(new HttpException(401, `Access forbidden, ${(e as Error).message}`));
  }
};

export default auth;
