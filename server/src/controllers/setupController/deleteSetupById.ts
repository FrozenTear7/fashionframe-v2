import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import Setup from '../../models/Setup';

const deleteSetupById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const setup = await Setup.findByIdAndDelete(id);

    if (!setup) next(new HttpException(404, 'Setup does not exist'));
    else res.sendStatus(200);
  } catch (e) {
    console.log(e);
    next(new HttpException(400, e));
  }
};

export default deleteSetupById;
