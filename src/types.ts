import { IUser } from './models/User';
import { Request } from 'express';

export interface Config {
  port: string;
  apiUrl: string;
  webUrl: string;
  database: {
    production: string;
    development: string;
  };
  jwtKey: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
  token: string;
}
