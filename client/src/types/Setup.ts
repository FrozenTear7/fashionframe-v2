import { ColorScheme } from './ColorScheme';
import { Syandana } from './Syandana';
import { Attachments } from './Attachments';
import { UserBase } from './User';

export interface SetupBase {
  _id: string;
  author: UserBase;
  name: string;
  frame: string;
  createdAt: Date;
}

export interface SetupItem extends SetupBase {
  screenshot: string;
  likes: number;
  likedByYou: boolean;
}

export interface SetupDetails extends SetupBase {
  screenshot: string;
  attachments: Attachments;
  syandana: Syandana;
  colorScheme: ColorScheme;
}

export interface NewSetup extends SetupBase {
  attachments: Attachments;
  syandana: Syandana;
  colorScheme: ColorScheme;
  screenshotImage: File;
}

export type NewSetupFormData = {
  name: string;
  description: string;
  frame: string;
  helmet: string;
  skin: string;
  screenshotImage: File;
  attachments: Omit<Attachments, '_id'>;
  syandana: Omit<Syandana, '_id'>;
  colorScheme: Omit<ColorScheme, '_id'>;
};
