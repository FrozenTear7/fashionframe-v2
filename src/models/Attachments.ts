import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface IAttachments extends Document {
  colorScheme: ObjectId;
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
    required: true,
  },
  chest: { type: String },
  leftArm: { type: String },
  rightArm: { type: String },
  leftLeg: { type: String },
  rightLeg: { type: String },
  ephemera: { type: String },
});

const Attachments: Model<IAttachments> = model(
  'Attachments',
  AttachmentsSchema
);

export default Attachments;
