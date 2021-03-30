export interface ContextUser {
  _id: string;
  username: string;
}

export interface IUserContext {
  user: ContextUser | null;
  setUser: (user: ContextUser | null) => void;
}