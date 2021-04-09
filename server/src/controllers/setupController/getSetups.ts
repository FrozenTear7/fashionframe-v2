import { NextFunction, Response, Request } from 'express';
import HttpException from '../../exceptions/HttpException';
import Setup from '../../models/Setup';
import { isNumber, isString } from '../../utils/parseTypes/typeChecks';

const perPage = 3;

const getSetups = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { frameFilter, sortByFilter, orderFilter, pageFilter = 0 } = req.query;

  if (
    sortByFilter &&
    !isString(sortByFilter) &&
    !['score', 'createdAt'].includes(String(sortByFilter))
  )
    return next(
      new HttpException(400, "Sort by requires 'score' or 'createdAt' values")
    );
  if (
    orderFilter &&
    !isNumber(orderFilter) &&
    ![1, -1].includes(+String(orderFilter))
  )
    return next(new HttpException(400, "Sort by requires '1' or '-1' values"));
  if (pageFilter && !isNumber(pageFilter) && +String(pageFilter) < 0)
    return next(new HttpException(400, 'Page must be a number >= 0'));

  let findFilter = {};
  if (frameFilter) findFilter = { ...findFilter, frame: frameFilter };

  try {
    const setups = await Setup.aggregate([
      { $match: findFilter },
      {
        $project: {
          name: 1,
          createdAt: 1,
          frame: 1,
          screenshot: 1,
          score: { $size: '$favoritedUsers' },
          author: 1,
        },
      },
      {
        $sort: {
          [String(sortByFilter)]: +String(orderFilter),
        },
      },
      {
        $skip: perPage * +String(pageFilter),
      },
      {
        $limit: perPage,
      },
    ]);
    const populatedSetups = await Setup.populate(setups, {
      path: 'author',
      select: 'username',
    });
    const setupsCount = await Setup.countDocuments(findFilter);

    res.send({
      setups: populatedSetups,
      pages: Math.ceil(setupsCount / perPage),
    });
  } catch (e) {
    console.log(e);
    next(new HttpException(404, e));
  }
};

export default getSetups;
