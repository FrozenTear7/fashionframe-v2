import { UserBase } from './User';

export interface SetupBase {
  _id: string;
  author: UserBase;
  name: string;
  frame: string;
  screenshot: string;
  createdAt: Date;
}

export interface SetupItem extends SetupBase {
  author: UserBase;
}
