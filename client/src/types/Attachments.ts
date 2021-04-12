import { ColorScheme } from './ColorScheme';

export interface Attachments {
  _id: string;
  colorScheme: ColorScheme;
  chest?: string;
  leftArm?: string;
  rightArm?: string;
  leftLeg?: string;
  rightLeg?: string;
  ephemera?: string;
  frameSpecific?: string;
}
