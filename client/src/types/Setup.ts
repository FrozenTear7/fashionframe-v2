import { ColorScheme } from './ColorScheme';
import { Syandana } from './Syandana';
import { Attachments } from './Attachments';
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
  likes: number;
  likedByYou: boolean;
}

export interface SetupDetails extends SetupBase {
  attachments: Attachments;
  syandana: Syandana;
  colorScheme: ColorScheme;
}
