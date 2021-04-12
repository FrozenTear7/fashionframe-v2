import { NextFunction, Response, Request } from 'express';
import User from '../../models/User';
import decodeJwt from '../../utils/decodeJwt';

const getOwnProfile = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { token } = req.cookies;
  const csrfToken = req.csrfToken();

  // Send only the token if the user is not signed in
  if (!token) res.send({ csrfToken });
  else {
    try {
      const userId = await decodeJwt(token);

      const user = await User.findOne({
        _id: userId,
        'tokens.token': token,
      });

      if (!user) res.send(csrfToken);
      else res.send({ _id: user._id, username: user.username, csrfToken });
    } catch (e) {
      console.log(e);
      res.send({ csrfToken });
    }
  }
};

export default getOwnProfile;
