import { model, Schema, Model, Document, ObjectId } from 'mongoose';
import Attachments from './Attachments';
import ColorScheme from './ColorScheme';
import Syandana from './Syandana';

export interface ISetup extends Document {
  user: ObjectId;
  attachments: ObjectId;
  syandana: ObjectId;
  colorScheme: ObjectId;
  name: string;
  description: string;
  frame: string;
  helmet: string;
  skin: string;
  screenshot: string;
  createdAt: Date;
  likes: number;
}

const SetupSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Author is required',
  },
  attachments: {
    type: Schema.Types.ObjectId,
    ref: 'Attachments',
    required: 'Attachments are required',
  },
  syandana: {
    type: Schema.Types.ObjectId,
    ref: 'Syandana',
    required: 'Syandana is required',
  },
  colorScheme: {
    type: Schema.Types.ObjectId,
    ref: 'ColorScheme',
    required: 'ColorScheme is required',
  },
  name: { type: String, required: 'Name is required', unique: true },
  description: { type: String },
  frame: { type: String, required: 'Frame is required' },
  helmet: { type: String, required: 'Helmet is required' },
  skin: { type: String, required: 'Skin is required' },
  screenshot: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    required: 'Date of creation is required - defaults to now',
  },
  likes: { type: Number, default: 0, required: 'Likes are required' },
});

SetupSchema.pre('remove', async function () {
  const setup = this as ISetup;

  await Attachments.deleteOne({ _id: setup.attachments });
  await Syandana.deleteOne({ _id: setup.syandana });
  await ColorScheme.deleteOne({ _id: setup.colorScheme });
});

const Setup: Model<ISetup> = model('Setup', SetupSchema);

export default Setup;
