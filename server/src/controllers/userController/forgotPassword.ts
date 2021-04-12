import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import User from '../../models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import config from '../../config';

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const { host } = req.headers;

  try {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await User.findOne({ email: email });

    if (!user) return next(new HttpException(400, 'User does not exist'));

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.gmail.login,
        pass: config.gmail.password,
      },
    });
    const mailOptions = {
      to: 'RainbowPablo7@gmail.com',
      from: config.gmail.login,
      subject: 'Fashionframe - password reset',
      text: `Hello ${
        user.username
      },\n\nYou requested a password reset, to continue please click the link below and input a new password (the link will be valid for an hour).\nIf you did not request a password change, please ignore this email.\nhttps://${String(
        host
      )}/reset/${token}\n\n\nSincerely,\nFashionframe`,
    };
    await transporter.sendMail(mailOptions);

    res.sendStatus(200);
  } catch (e) {
    next(new HttpException(400, e.message));
  }
};

export default forgotPassword;
