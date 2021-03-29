import { IUser } from './models/User';
import { Request } from 'express';

export interface Config {
  port: string;
  mode: string;
  database: string;
  jwtKey: string;
  imgur: {
    id: string;
    secret: string;
    album: string;
    refreshToken: string;
  };
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
  token: string;
}
