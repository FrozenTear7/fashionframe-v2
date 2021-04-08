import { exists } from '../../utils/parseTypes/typeChecks';
import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import HttpException from '../../exceptions/HttpException';
import Attachments from '../../models/Attachments';
import ColorScheme from '../../models/ColorScheme';
import Setup from '../../models/Setup';
import Syandana from '../../models/Syandana';
import uploadToAlbum from '../../utils/imgur/uploadToAlbum';

const createSetup = async (
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

export default createSetup;
