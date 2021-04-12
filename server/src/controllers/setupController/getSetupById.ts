import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import HttpException from '../../exceptions/HttpException';
import Setup from '../../models/Setup';
import User, { IUser } from '../../models/User';
import decodeJwt from '../../utils/decodeJwt';

const getSetupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const { token } = req.cookies;

    let user: IUser | null = null;
    if (token) {
      try {
        const userId = await decodeJwt(token);

        user = await User.findOne({
          _id: userId,
          'tokens.token': token,
        });
      } catch (e) {
        console.log(e);
      }
    }

    const setup = await Setup.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      {
        $project: {
          name: 1,
          description: 1,
          createdAt: 1,
          frame: 1,
          helmet: 1,
          skin: 1,
          screenshot: 1,
          attachments: 1,
          syandana: 1,
          colorScheme: 1,
          favoritedUsers: 1,
          author: 1,
          favorited: { $in: [user?._id || null, '$favoritedUsers'] },
          score: { $size: '$favoritedUsers' },
        },
      },
    ]);

    if (!setup) return next(new HttpException(404, 'Setup does not exist'));

    const populatedSetup = await Setup.populate(setup, [
      {
        path: 'author',
        select: 'username',
      },
      {
        path: 'attachments',
        populate: {
          path: 'colorScheme',
        },
      },
      {
        path: 'syandana',
        populate: {
          path: 'colorScheme',
        },
      },
      {
        path: 'colorScheme',
      },
    ]);

    res.send(populatedSetup[0]);
  } catch (e) {
    console.log(e);
    next(new HttpException(404, e));
  }
};

export default getSetupById;
