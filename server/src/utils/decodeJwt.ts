import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import { JwtToken } from '../types';

const decodeJwt = async (token: string): Promise<string> => {
  try {
    const { _id: userId } = jwt.verify(token, config.jwtKey) as JwtToken; // We know that we have a string in there
    return userId.toString();
  } catch (e) {
    // Clean up this token from user tokens
    const { _id: userId } = jwt.verify(token, config.jwtKey, {
      ignoreExpiration: true,
    }) as JwtToken;
    await User.findOneAndUpdate(
      {
        _id: userId,
        'tokens.token': token,
      },
      {
        $pull: {
          tokens: { token: token },
        },
      }
    );

    throw e;
  }
};

export default decodeJwt;
