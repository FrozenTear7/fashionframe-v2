import { IUser } from '../../models/User';
import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';

const signOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: IUser = req.user;

    req.user.tokens = user.tokens.filter(
      ({ token }) => token != req.cookies.token
    );
    await user.save();

    res.clearCookie('token');
    res.sendStatus(200);
  } catch (e) {
    next(new HttpException(500, e));
  }
};

export default signOutUser;
