import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
});

const User: Model<IUser> = model('User', UserSchema);

export default User;
