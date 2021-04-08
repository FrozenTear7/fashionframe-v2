import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import User from '../../models/User';
import HttpException from '../../exceptions/HttpException';
import Setup, { ISetup } from '../../models/Setup';

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const user = await User.findById(id, 'username');

    if (!user) return next(new HttpException(404, 'User does not exist'));

    const userSetups: ISetup[] = await Setup.aggregate([
      { $match: { author: mongoose.Types.ObjectId(user._id) } },
      {
        $project: {
          name: 1,
          score: { $size: '$favoritedUsers' },
        },
      },
    ]);

    res.send({
      _id: user._id,
      username: user.username,
      totalScore: userSetups.reduce(
        (acc, setup) => acc + (setup.score || 0),
        0
      ),
    });
  } catch (e) {
    console.log(e);
    next(new HttpException(404, e));
  }
};

export default getUserById;
