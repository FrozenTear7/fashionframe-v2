import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import User, { IUser } from '../../models/User';
import Setup from '../../models/Setup';
import decodeJwt from '../../utils/decodeJwt';

const getUserFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
        return next(
          new HttpException(401, 'Session expires, please sign in again')
        );
      }
    }

    if (!user)
      return next(
        new HttpException(400, "Error while fetching user's favorited setups")
      );

    const setups = await Setup.aggregate([
      {
        $match: {
          $expr: {
            $in: ['$_id', user.favoritedSetups],
          },
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          frame: 1,
          screenshot: 1,
          score: { $size: '$favoritedUsers' },
          author: 1,
          favoritedUsers: 1,
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
  } catch (e) {
    console.log(e);
    next(new HttpException(404, e));
  }
};

export default getUserFavorites;
