import { NextFunction, Response, Request } from 'express';
import HttpException from '../exceptions/HttpException';
import Attachments from '../models/Attachments';
import ColorScheme from '../models/ColorScheme';
import Setup from '../models/Setup';
import Syandana from '../models/Syandana';
import User from '../models/User';
import mongoose from 'mongoose';

export const createSetup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { attachments, syandana, colorScheme, ...setup } = req.body;

  const session = await mongoose.startSession();

  try {
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
      user: req.user._id,
      attachments: createdAttachments,
      syandana: createdSyandana,
      colorScheme: createdColorScheme,
      ...setup,
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
    next(new HttpException(400, `Error while creating setup`));
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

    if (user) {
      const setups = await Setup.find({ user: user._id });

      res.send({
        data: setups,
        message: `Successfully fetched setups`,
      });
    } else {
      next(new HttpException(404, `User does not exist`));
    }
  } catch (e) {
    console.log(e);
    next(new HttpException(404, `Error while fetching setups`));
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

    if (setup) {
      res.send({
        data: setup,
        message: `Successfully fetched setup`,
      });
    } else {
      next(new HttpException(404, `Setup does not exist`));
    }
  } catch (e) {
    console.log(e);
    next(new HttpException(404, `Error while fetching setup`));
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
      });
      const updatedAttachments = await Attachments.findByIdAndUpdate(
        updatedSetup?.attachments,
        attachments,
        {
          session,
        }
      );
      await ColorScheme.findByIdAndUpdate(
        updatedAttachments?.colorScheme,
        attachmentsColorScheme,
        {
          session,
        }
      );
      const updatedSyandana = await Syandana.findByIdAndUpdate(
        updatedSetup?.syandana,
        syandana,
        {
          session,
        }
      );
      await ColorScheme.findByIdAndUpdate(
        updatedSyandana?.colorScheme,
        syandanaColorScheme,
        {
          session,
        }
      );
      await ColorScheme.findByIdAndUpdate(
        updatedSetup?.colorScheme,
        colorScheme,
        {
          session,
        }
      );
    });

    const updatedSetup2 = await Setup.findById(id)
      .populate('attachments')
      .populate('syandana')
      .populate('colorScheme');

    res.send({
      data: updatedSetup2,
      message: `Successfully updated setup`,
    });
  } catch (e) {
    console.log(e);
    next(new HttpException(400, `Error while updating setup`));
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

    if (setup) {
      res.send({
        data: setup,
        message: `Successfully deleted setup`,
      });
    } else {
      next(new HttpException(404, `Setup does not exist`));
    }
  } catch (e) {
    console.log(e);
    next(new HttpException(404, `Error while deleting setup`));
  }
};
