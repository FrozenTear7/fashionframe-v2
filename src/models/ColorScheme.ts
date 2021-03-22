import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IColorScheme extends Document {
  setup: ObjectId;
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
  setup: { type: Schema.Types.ObjectId, ref: 'Setup', required: true },
  primary: { type: String },
  secondary: { type: String },
  tertiary: { type: String },
  accents: { type: String },
  emmissive1: { type: String },
  emmissive2: { type: String },
  energy1: { type: String },
  energy2: { type: String },
});

const ColorScheme: Model<IColorScheme> = model(
  'ColorScheme',
  ColorSchemeSchema
);

export default ColorScheme;
