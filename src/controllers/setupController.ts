import { exists } from './../utils/parseTypes/typeChecks';
import { NextFunction, Response, Request } from 'express';
import HttpException from '../exceptions/HttpException';
import Attachments from '../models/Attachments';
import ColorScheme from '../models/ColorScheme';
import Setup from '../models/Setup';
import Syandana from '../models/Syandana';
import User from '../models/User';
import mongoose from 'mongoose';
import uploadToAlbum from '../utils/imgur/uploadToAlbum';

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
    const screenshot = await uploadToAlbum(
      setup.name,
      setup.description,
      screenshotImage
    );

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

    res.send({
      data: createdSetup,
      message: `Successfully created setup`,
    });
  } catch (e) {
    console.log(e);
    next(new HttpException(400, e));
  } finally {
    session.endSession();
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

      res.send({
        data: setups,
        message: `Successfully fetched setups`,
      });
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
    const setup = await Setup.findById(id)
      .populate('user')
      .populate('attachments')
      .populate('colorScheme')
      .populate('syandana');

    if (!setup) next(new HttpException(404, 'Setup does not exist'));
    else
      res.send({
        data: setup,
        message: `Successfully fetched setup`,
      });
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

    console.log(updatedSetup2);

    res.send({
      data: updatedSetup2,
      message: `Successfully updated setup`,
    });
  } catch (e) {
    console.log(e);
    next(new HttpException(400, e));
  } finally {
    session.endSession();
  }
};

export const likeSetupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;
  const userId: string = req.user._id;

  const session = await mongoose.startSession();

  try {
    let setup;

    await session.withTransaction(async () => {
      setup = await Setup.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            likedUsers: mongoose.Types.ObjectId(userId),
          },
        },
        { session, runValidators: true }
      );

      if (setup) {
        await User.findByIdAndUpdate(
          userId,
          {
            $addToSet: {
              likedSetups: mongoose.Types.ObjectId(id),
            },
          },
          { session, runValidators: true }
        );
      }
    });

    if (!setup) {
      next(new HttpException(404, 'Setup does not exist'));
    } else {
      res.send({ message: 'Successfully liked setup' });
    }
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
    else
      res.send({
        message: `Successfully deleted setup`,
      });
  } catch (e) {
    console.log(e);
    next(new HttpException(400, e));
  }
};
