import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IColorScheme extends Document {
  setup: ObjectId;
  colorScheme: ObjectId;
  chest: string;
  leftArm: string;
  rightArm: string;
  leftLeg: string;
  rightLeg: string;
  ephemera: string;
}

const ColorSchemeSchema: Schema = new Schema({
  setup: { type: Schema.Types.ObjectId, ref: 'Setup', required: true },
  colorScheme: {
    type: Schema.Types.ObjectId,
    ref: 'ColorScheme',
    required: true,
  },
  chest: { type: String },
  leftArm: { type: String },
  rightArm: { type: String },
  leftLeg: { type: String },
  rightLeg: { type: String },
  ephemera: { type: String },
});

const ColorScheme: Model<IColorScheme> = model(
  'ColorScheme',
  ColorSchemeSchema
);

export default ColorScheme;
