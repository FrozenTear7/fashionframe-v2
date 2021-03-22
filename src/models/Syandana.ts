import { model, Schema, Model, Document, ObjectId } from 'mongoose';

interface ISyandana extends Document {
  setup: ObjectId;
  colorScheme: ObjectId;
  name: string;
}

const SyandanaSchema: Schema = new Schema({
  setup: { type: Schema.Types.ObjectId, ref: 'Setup', required: true },
  colorScheme: {
    type: Schema.Types.ObjectId,
    ref: 'ColorScheme',
    required: true,
  },
  name: { type: String, required: true },
});

const Syandana: Model<ISyandana> = model('Syandana', SyandanaSchema);

export default Syandana;
