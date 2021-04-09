import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import User from '../../models/User';
import config from '../../config';

const getOwnProfile = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { token } = req.cookies;
  const csrfToken = req.csrfToken();

  if (!token) res.send({ csrfToken });
  // Send only the token if the user is not signed in
  else {
    const data = jwt.verify(token, config.jwtKey);

    const user = await User.findOne({
      _id: data,
      'tokens.token': token,
    });

    if (!user) res.send(csrfToken);
    else res.send({ _id: user._id, username: user.username, csrfToken });
  }
};

export default getOwnProfile;
