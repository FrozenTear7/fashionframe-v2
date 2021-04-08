import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import Setup from '../../models/Setup';
import User from '../../models/User';

const getSetupsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      next(new HttpException(404, 'User does not exist'));
    } else {
      const setups = await Setup.find({ user: user?._id });

      res.send(setups);
    }
  } catch (e) {
    console.log(e);
    next(new HttpException(404, e));
  }
};

export default getSetupsByUserId;
