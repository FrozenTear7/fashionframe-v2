/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isString } from './typeChecks';

export const handleCatch = (logMsg: string, e: any): void => {
  if (e instanceof Error) {
    console.log(`${logMsg}: ${e.message}`);
  } else if (isString(e)) {
    console.log(`${logMsg}: ${e}`);
  } else {
    throw e;
  }
};
