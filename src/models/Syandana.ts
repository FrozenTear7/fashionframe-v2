import { model, Schema, Model, Document, ObjectId } from 'mongoose';
import ColorScheme from './ColorScheme';

export interface ISyandana extends Document {
  colorScheme: ObjectId;
  name: string;
}

const SyandanaSchema: Schema = new Schema({
  colorScheme: {
    type: Schema.Types.ObjectId,
    ref: 'ColorScheme',
    required: true,
  },
  name: { type: String, required: true },
});

SyandanaSchema.pre('remove', async function () {
  const syandana = this as ISyandana;

  await ColorScheme.deleteOne({ _id: syandana.colorScheme });
});

const Syandana: Model<ISyandana> = model('Syandana', SyandanaSchema);

export default Syandana;
