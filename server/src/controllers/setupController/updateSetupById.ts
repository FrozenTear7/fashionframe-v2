import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import HttpException from '../../exceptions/HttpException';
import Attachments from '../../models/Attachments';
import ColorScheme from '../../models/ColorScheme';
import Setup from '../../models/Setup';
import Syandana from '../../models/Syandana';

const updateSetupById = async (
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

export default updateSetupById;
