import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface ISetup extends Document {
  user: ObjectId;
  attachments: ObjectId;
  syandana: ObjectId;
  colorScheme: ObjectId;
  name: string;
  description: string;
  helmet: string;
  frame: string;
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
  name: { type: String, required: 'Name is required' },
  description: { type: String },
  frame: { type: String, required: 'Frame is required' },
  screenshot: { type: String },
  createdAt: {
    type: Date,
    required: 'Date of creation is required - defaults to now',
  },
  likes: { type: Number, default: 0, required: 'Likes are required' },
});

const Setup: Model<ISetup> = model('Setup', SetupSchema);

export default Setup;
