import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import HttpException from '../../exceptions/HttpException';
import Setup from '../../models/Setup';
import User from '../../models/User';

const favoriteSetupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const userId: string = req.user._id;

  const session = await mongoose.startSession();

  try {
    const currentSetup = await Setup.findById(id);

    if (!currentSetup)
      return next(new HttpException(404, 'Setup does not exist'));

    if (
      !currentSetup.favoritedUsers.includes(mongoose.Types.ObjectId(userId))
    ) {
      await session.withTransaction(async () => {
        await Setup.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              favoritedUsers: mongoose.Types.ObjectId(userId),
            },
          },
          { session, runValidators: true }
        );

        await User.findByIdAndUpdate(
          userId,
          {
            $addToSet: {
              favoritedSetups: mongoose.Types.ObjectId(id),
            },
          },
          { session, runValidators: true }
        );
      });
    } else {
      await session.withTransaction(async () => {
        await Setup.findByIdAndUpdate(
          id,
          {
            $pull: {
              favoritedUsers: mongoose.Types.ObjectId(userId),
            },
          },
          { session, runValidators: true }
        );

        await User.findByIdAndUpdate(
          userId,
          {
            $pull: {
              favoritedSetups: mongoose.Types.ObjectId(id),
            },
          },
          { session, runValidators: true }
        );
      });
    }

    res.send(
      !currentSetup.favoritedUsers.includes(mongoose.Types.ObjectId(userId))
    );
  } catch (e) {
    console.log(e);
    next(new HttpException(400, e));
  } finally {
    session.endSession();
  }
};

export default favoriteSetupById;
