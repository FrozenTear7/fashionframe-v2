import { model, Schema, Model, Document } from 'mongoose';

const validateColorRGB = (color: string): void => {
  if (color && !/^#([a-fA-F0-9]{6})$/.test(color))
    throw new Error('Invalid color hex format');
};

export interface IColorScheme extends Document {
  primary: string;
  secondary: string;
  tertiary: string;
  accents: string;
  emmissive1: string;
  emmissive2: string;
  energy1: string;
  energy2: string;
}

const ColorSchemeSchema: Schema = new Schema({
  primary: {
    type: String,
    validate: validateColorRGB,
  },
  secondary: { type: String, validate: validateColorRGB },
  tertiary: { type: String, validate: validateColorRGB },
  accents: { type: String, validate: validateColorRGB },
  emmissive1: { type: String, validate: validateColorRGB },
  emmissive2: { type: String, validate: validateColorRGB },
  energy1: { type: String, validate: validateColorRGB },
  energy2: { type: String, validate: validateColorRGB },
});

const ColorScheme: Model<IColorScheme> = model(
  'ColorScheme',
  ColorSchemeSchema
);

export default ColorScheme;
