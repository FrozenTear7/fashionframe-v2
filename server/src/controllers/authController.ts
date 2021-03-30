import { IUser } from './../models/User';
import { NextFunction, Response, Request } from 'express';
import HttpException from '../exceptions/HttpException';
import User from '../models/User';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();

    res.cookie('token', token, { httpOnly: true });
    res.send({ user });
  } catch (e) {
    next(new HttpException(400, e.message));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();

    res.cookie('token', token, { httpOnly: true });
    res.send({ _id: user._id, username: user.username });
  } catch (e) {
    next(new HttpException(400, e.message));
  }
};

export const getOwnProfile = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.send({ data: req.user });
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as IUser;
    req.user.tokens = user.tokens.filter(({ token }) => token != req.token);

    await user.save();
    res.sendStatus(200);
  } catch (e) {
    next(new HttpException(500, e));
  }
};

export const getCsrfToken = (req: Request, res: Response): void => {
  res.send({ csrfToken: req.csrfToken() });
};
