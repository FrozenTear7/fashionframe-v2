import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import User from '../../models/User';

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.params;
  const { password } = req.body;

  console.log(token, password);

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return next(
        new HttpException(400, 'Password reset token is invalid or has expired')
      );

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.sendStatus(200);
  } catch (e) {
    next(new HttpException(400, e.message));
  }
};

export default resetPassword;
