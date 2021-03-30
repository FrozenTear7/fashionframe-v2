import * as React from 'react';
import { ContextUser, IUserContext } from './types/index';

export const UserContext = React.createContext<IUserContext>({
  user: null,
  setUser: (_user: ContextUser | null) => console.warn('no user provider'),
});
export const useUserContext = (): IUserContext => React.useContext(UserContext);
