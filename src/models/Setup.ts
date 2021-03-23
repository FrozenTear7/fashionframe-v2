import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface ISetup extends Document {
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

const Setup: Model<ISetup> = model('Setup', SetupSchema);

export default Setup;
