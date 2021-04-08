import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
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
      const setups = await Setup.aggregate([
        { $match: { author: mongoose.Types.ObjectId(user._id) } },
        {
          $project: {
            name: 1,
            createdAt: 1,
            frame: 1,
            screenshot: 1,
            score: { $size: '$favoritedUsers' },
            author: 1,
          },
        },
        {
          $sort: {
            score: -1,
          },
        },
      ]);
      const populatedSetups = await Setup.populate(setups, {
        path: 'author',
        select: 'username',
      });

      res.send(populatedSetups);
    }
  } catch (e) {
    console.log(e);
    next(new HttpException(404, e));
  }
};

export default getSetupsByUserId;
