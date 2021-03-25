import { model, Schema, Model, Document, Types } from 'mongoose';
import validator from 'validator';
import Attachments from './Attachments';
import ColorScheme from './ColorScheme';
import Syandana from './Syandana';

export interface ISetup extends Document {
  author: Types.ObjectId;
  likedUsers: Types.ObjectId[];
  attachments: Types.ObjectId;
  syandana: Types.ObjectId;
  colorScheme: Types.ObjectId;
  name: string;
  description: string;
  frame: string;
  helmet: string;
  skin: string;
  screenshot: string;
  createdAt: Date;
}

const SetupSchema: Schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Author is required',
  },
  likedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
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
  screenshot: {
    type: String,
    validate: (value: string): void => {
      if (value && !validator.isURL(value)) {
        throw new Error('Invalid screenshot URL');
      }
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: 'Date of creation is required - defaults to now',
  },
});

SetupSchema.pre('remove', async function () {
  const setup = this as ISetup;

  await Attachments.deleteOne({ _id: setup.attachments });
  await Syandana.deleteOne({ _id: setup.syandana });
  await ColorScheme.deleteOne({ _id: setup.colorScheme });
});

const Setup: Model<ISetup> = model('Setup', SetupSchema);

export default Setup;
