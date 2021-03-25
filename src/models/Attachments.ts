import { model, Schema, Model, Document, Types } from 'mongoose';
import ColorScheme from './ColorScheme';

export interface IAttachments extends Document {
  colorScheme: Types.ObjectId;
  chest: string;
  leftArm: string;
  rightArm: string;
  leftLeg: string;
  rightLeg: string;
  ephemera: string;
}

const AttachmentsSchema: Schema = new Schema({
  colorScheme: {
    type: Schema.Types.ObjectId,
    ref: 'ColorScheme',
    required: 'ColorScheme is required',
  },
  chest: { type: String },
  leftArm: { type: String },
  rightArm: { type: String },
  leftLeg: { type: String },
  rightLeg: { type: String },
  ephemera: { type: String },
});

AttachmentsSchema.pre(
  'remove',
  { document: true, query: false },
  async function () {
    const attachments = this as IAttachments;

    await ColorScheme.deleteOne({ _id: attachments.colorScheme });
  }
);

const Attachments: Model<IAttachments> = model(
  'Attachments',
  AttachmentsSchema
);

export default Attachments;
