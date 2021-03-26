import { IUser } from './models/User';
import { Request } from 'express';

export interface Config {
  port: string;
  apiUrl: string;
  webUrl: string;
  database: string;
  jwtKey: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
  token: string;
}
