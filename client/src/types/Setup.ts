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
  score: number;
}

export interface SetupDetails extends SetupBase {
  description?: string;
  helmet: string;
  skin: string;
  screenshot: string;
  attachments: Attachments;
  syandana: Syandana;
  colorScheme: ColorScheme;
  score: number;
  favorited: boolean;
}

export interface NewSetupFormData {
  name: string;
  description: string;
  frame: string;
  helmet: string;
  skin: string;
  screenshotImage: FileList;
  attachments: {
    colorScheme: Omit<ColorScheme, '_id'>;
    chest?: string;
    leftArm?: string;
    rightArm?: string;
    leftLeg?: string;
    rightLeg?: string;
    ephemera?: string;
  };
  syandana: {
    colorScheme: Omit<ColorScheme, '_id'>;
    name?: string;
  };
  colorScheme: Omit<ColorScheme, '_id'>;
}
