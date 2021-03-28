/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  export interface Request {
    user: any;
    token: any;
  }
}

declare namespace NodeJS {
  export interface Global {
    __MONGO_URI__: string;
  }
}
