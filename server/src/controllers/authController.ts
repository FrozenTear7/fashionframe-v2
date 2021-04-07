import { IUser } from './../models/User';
import { NextFunction, Response, Request } from 'express';
import HttpException from '../exceptions/HttpException';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

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

export const getOwnProfile = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { token } = req.cookies;
  const csrfToken = req.csrfToken();

  if (!token) res.send({ csrfToken });
  // Send only the token if the user is not signed in
  else {
    const data = jwt.verify(token, config.jwtKey);

    const user = await User.findOne({
      _id: data,
      'tokens.token': token,
    });

    if (!user) res.send(null);
    else res.send({ _id: user._id, username: user.username, csrfToken });
  }
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

    res.clearCookie('token');
    res.sendStatus(200);
  } catch (e) {
    next(new HttpException(500, e));
  }
};
