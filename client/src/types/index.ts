export interface ContextUser {
  _id: string;
  username: string;
}

export interface IUserContext {
  user: ContextUser | null;
  setUser: (user: ContextUser | null) => void;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface GetRequestGeneric {
  loading: boolean;
  error: string | undefined;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}
