import { model, Schema, Model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  tokens: Array<{ token: string }>;
  generateAuthToken(): Promise<string>;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(username: string, password: string): Promise<IUser>;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value: string): void => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email address');
      }
    },
  },
  password: { type: String, required: true, minLength: 7 },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 10);

  next();
});

UserSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this as IUser;
  const token = jwt.sign({ _id: user._id }, 'TEST');

  user.tokens = [...user.tokens, { token }];

  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (
  username,
  password
): Promise<IUser> => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User does not exist');

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error('Password do not match');

  return user;
};

const User: IUserModel = model<IUser, IUserModel>('User', UserSchema);

export default User;
