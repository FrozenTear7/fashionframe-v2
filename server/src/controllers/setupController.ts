import { exists, isString, isNumber } from './../utils/parseTypes/typeChecks';
import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import Attachments from '../models/Attachments';
import ColorScheme from '../models/ColorScheme';
import Setup from '../models/Setup';
import Syandana from '../models/Syandana';
import User, { IUser } from '../models/User';
import uploadToAlbum from '../utils/imgur/uploadToAlbum';
import config from '../config';

export const createSetup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { attachments, syandana, colorScheme, ...setup } = JSON.parse(
    req.body.setup
  );
  const screenshotImage = req.file;

  if (!exists(attachments))
    return next(
      new HttpException(
        400,
        'Setup validation failed: attachments: Attachments is required'
      )
    );
  else if (!exists(syandana))
    return next(
      new HttpException(
        400,
        'Setup validation failed: syandana: Syandana is required'
      )
    );
  else if (!exists(colorScheme))
    return next(
      new HttpException(
        400,
        'Setup validation failed: colorScheme: ColorScheme is required'
      )
    );

  const session = await mongoose.startSession();

  try {
    const screenshot = screenshotImage
      ? await uploadToAlbum(setup.name, setup.description, screenshotImage)
      : undefined;

    const createdAttachmentsColorScheme = new ColorScheme(
      attachments.colorScheme
    );
    const createdAttachments = new Attachments({
      ...attachments,
      colorScheme: createdAttachmentsColorScheme,
    });

    const createdSyandanaColorScheme = new ColorScheme(syandana.colorScheme);
    const createdSyandana = new Syandana({
      ...syandana,
      colorScheme: createdSyandanaColorScheme,
    });

    const createdColorScheme = new ColorScheme(colorScheme);

    const createdSetup = new Setup({
      author: req.user._id,
      attachments: createdAttachments,
      syandana: createdSyandana,
      colorScheme: createdColorScheme,
      ...{ ...setup, screenshot: screenshot },
    });

    await session.withTransaction(async () => {
      await createdSyandanaColorScheme.save({ session });
      await createdSyandana.save({ session });
      await createdAttachmentsColorScheme.save({ session });
      await createdAttachments.save({ session });
      await createdColorScheme.save({ session });
      await createdSetup.save({ session });
    });

    res.send(createdSetup);
  } catch (e) {
    next(new HttpException(400, e));
  } finally {
    session.endSession();
  }
};

export const getSetups = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { frameFilter, sortByFilter, orderFilter } = req.query;

  if (
    sortByFilter &&
    !isString(sortByFilter) &&
    !['score', 'createdAt'].includes(String(sortByFilter))
  )
    return next(
      new HttpException(400, "Sort by requires 'score' or 'createdAt' values")
    );
  if (
    orderFilter &&
    !isNumber(orderFilter) &&
    ![1, -1].includes(parseInt(String(orderFilter)))
  )
    return next(new HttpException(400, "Sort by requires '1' or '-1' values"));

  let findFilter = {};
  if (frameFilter) findFilter = { ...findFilter, frame: frameFilter };

  try {
    const setups = await Setup.aggregate([
      { $match: findFilter },
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
          [String(sortByFilter)]: parseInt(String(orderFilter)),
        },
      },
    ]);
    const populatedSetup = await Setup.populate(setups, {
      path: 'author',
      select: 'username',
    });

    res.send(populatedSetup);
  } catch (e) {
    console.log(e);
    next(new HttpException(404, e));
  }
};

export const getSetupsByUserId = async (
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

export const getSetupById = async (
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
        const data = jwt.verify(token, config.jwtKey);

        user = await User.findOne({
          _id: data,
          'tokens.token': token,
        });
      } catch (e) {
        console.log(e);
        return next(new HttpException(400, 'Error while fetching the setup'));
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

export const updateSetupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const {
    attachments: { colorScheme: attachmentsColorScheme, ...attachments },
    syandana: { colorScheme: syandanaColorScheme, ...syandana },
    colorScheme,
    ...setup
  } = req.body;

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const updatedSetup = await Setup.findByIdAndUpdate(id, setup, {
        session,
        runValidators: true,
      });
      const updatedAttachments = await Attachments.findByIdAndUpdate(
        updatedSetup?.attachments,
        attachments,
        {
          session,
          runValidators: true,
        }
      );
      await ColorScheme.findByIdAndUpdate(
        updatedAttachments?.colorScheme,
        attachmentsColorScheme,
        {
          session,
          runValidators: true,
        }
      );
      const updatedSyandana = await Syandana.findByIdAndUpdate(
        updatedSetup?.syandana,
        syandana,
        {
          session,
          runValidators: true,
        }
      );
      await ColorScheme.findByIdAndUpdate(
        updatedSyandana?.colorScheme,
        syandanaColorScheme,
        {
          session,
          runValidators: true,
        }
      );
      await ColorScheme.findByIdAndUpdate(
        updatedSetup?.colorScheme,
        colorScheme,
        {
          session,
          runValidators: true,
        }
      );
    });

    const updatedSetup2 = await Setup.findById(id)
      .populate('attachments')
      .populate('syandana')
      .populate('colorScheme');

    res.send(updatedSetup2);
  } catch (e) {
    console.log(e);
    next(new HttpException(400, e));
  } finally {
    session.endSession();
  }
};

export const favoriteSetupById = async (
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

export const deleteSetupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const setup = await Setup.findByIdAndDelete(id);

    if (!setup) next(new HttpException(404, 'Setup does not exist'));
    else res.sendStatus(200);
  } catch (e) {
    console.log(e);
    next(new HttpException(400, e));
  }
};
