import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import User from '../../models/User';
import config from '../../config';

const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.password !== req.body.password2)
    return next(new HttpException(400, 'Passwords do not match'));

  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.mode === 'production',
    });
    res.send({ _id: user._id, username: user.username });
  } catch (e) {
    next(new HttpException(400, e.message));
  }
};

export default signUpUser;
