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
  const {
    user,
    attachments,
    syandana,
    colorScheme,
    name,
    description,
    frame,
    helmet,
    skin,
    screenshot,
  } = req.body;

  const session = await mongoose.startSession();

  try {
    const createdUser = new User({ username: user.username });

    const createdAttachmentsColorScheme = new ColorScheme({
      primary: attachments.colorScheme.primary,
      secondary: attachments.colorScheme.secondary,
      tertiary: attachments.colorScheme.tertiary,
      accents: attachments.colorScheme.accents,
      emmissive1: attachments.colorScheme.emmissive1,
      emmissive2: attachments.colorScheme.emmissive2,
      energy1: attachments.colorScheme.energy1,
      energy2: attachments.colorScheme.energy2,
    });
    const createdAttachments = new Attachments({
      colorScheme: createdAttachmentsColorScheme,
      chest: attachments.chest,
      leftArm: attachments.leftArm,
      rightArm: attachments.rightArm,
      leftLeg: attachments.leftLeg,
      rightLeg: attachments.rightLeg,
      ephemera: attachments.ephemera,
    });

    const createdSyandanaColorScheme = new ColorScheme({
      primary: syandana.colorScheme.primary,
      secondary: syandana.colorScheme.secondary,
      tertiary: syandana.colorScheme.tertiary,
      accents: syandana.colorScheme.accents,
      emmissive1: syandana.colorScheme.emmissive1,
      emmissive2: syandana.colorScheme.emmissive2,
      energy1: syandana.colorScheme.energy1,
      energy2: syandana.colorScheme.energy2,
    });
    const createdSyandana = new Syandana({
      colorScheme: createdSyandanaColorScheme,
      name: syandana.name,
    });

    const createdColorScheme = new ColorScheme({
      primary: colorScheme.primary,
      secondary: colorScheme.secondary,
      tertiary: colorScheme.tertiary,
      accents: colorScheme.accents,
      emmissive1: colorScheme.emmissive1,
      emmissive2: colorScheme.emmissive2,
      energy1: colorScheme.energy1,
      energy2: colorScheme.energy2,
    });

    const createdSetup = new Setup({
      user: createdUser,
      attachments: createdAttachments,
      syandana: createdSyandana,
      colorScheme: createdColorScheme,
      name: name,
      description: description,
      frame: frame,
      helmet: helmet,
      skin: skin,
      screenshot: screenshot,
    });

    await session.withTransaction(async () => {
      await createdUser.save({ session });
      await createdSyandanaColorScheme.save({ session });
      await createdSyandana.save({ session });
      await createdAttachmentsColorScheme.save({ session });
      await createdAttachments.save({ session });
      await createdColorScheme.save({ session });
      await createdSetup.save({ session });
    });

    console.log(createdSetup);
    res.send({
      data: createdSetup,
      message: `Successfully created setup`,
    });
  } catch (e) {
    console.log(e.message);
    next(new HttpException(400, `Error while creating setup`));
  } finally {
    session.endSession();
  }
};

export const getSetupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const setup = await Setup.findById(id);
    console.log(setup);
    res.send({
      data: setup,
      message: `Successfully deleted setup`,
    });
  } catch (e) {
    next(new HttpException(404, `Error while fetching setup`));
  }
};

export const deleteSetupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    await Setup.findByIdAndDelete(id);
    res.send({ message: `Successfully deleted setup` });
  } catch (e) {
    next(new HttpException(404, `Error while deleting setup`));
  }
};
