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

    res.status(201).send({ user, token });
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

    res.send({ user, token });
  } catch (e) {
    next(new HttpException(400, e.message));
  }
};

export const getOwnProfile = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.send(req.user);
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
  } catch (error) {
    next(new HttpException(500, error));
  }
};
