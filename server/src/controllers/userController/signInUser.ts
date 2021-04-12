import { NextFunction, Response, Request } from 'express';
import config from '../../config';
import HttpException from '../../exceptions/HttpException';
import User from '../../models/User';

const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
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

export default signInUser;
