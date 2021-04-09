import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import Setup from '../../models/Setup';
import User, { IUser } from '../../models/User';
import jwt from 'jsonwebtoken';
import config from '../../config';

const getUserFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req);
  try {
    const { token } = req.cookies;

    let user: IUser | null = null;
    if (token) {
      try {
        const data = jwt.verify(token, config.jwtKey);

        user = await User.findOne({
          _id: data,
          'tokens.token': token,
        });
      } catch (e) {
        console.log(e);
        return next(
          new HttpException(400, "Error while fetching user's favorited setups")
        );
      }
    }

    if (!user)
      return next(
        new HttpException(400, "Error while fetching user's favorited setups")
      );

    const populatedSetups = await Setup.populate(user, [
      {
        path: 'favoritedSetups',
      },
      //   {
      //     path: 'author',
      //     select: 'username',
      //   },
      //   {
      //     path: 'attachments',
      //     populate: {
      //       path: 'colorScheme',
      //     },
      //   },
      //   {
      //     path: 'syandana',
      //     populate: {
      //       path: 'colorScheme',
      //     },
      //   },
      //   {
      //     path: 'colorScheme',
      //   },
    ]);

    res.send(populatedSetups);
  } catch (e) {
    console.log(e);
    next(new HttpException(404, e));
  }
};

export default getUserFavorites;
