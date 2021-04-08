import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import User from '../../models/User';

const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();

    res.cookie('token', token, { httpOnly: true });
    res.send({ user });
  } catch (e) {
    next(new HttpException(400, e.message));
  }
};

export default signUpUser;
