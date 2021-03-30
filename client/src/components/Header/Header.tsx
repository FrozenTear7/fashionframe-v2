import * as React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../UserContext';
import { signOut } from '../../utils/auth';

const Header: React.VFC = () => {
  const { user, setUser } = useUserContext();

  return (
    <div className="Header">
      HEADER - User: {user?.username}
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        {!user && (
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        )}
        {user && (
          <button
            type="button"
            onClick={async (): Promise<void> => {
              await signOut();
              setUser(null);
            }}
          >
            Sign out
          </button>
        )}
        <li>
          <Link to="/setups">Setups</Link>
        </li>
        <li>
          <Link to="/setups/create">Create new setup</Link>
        </li>
        <li>
          <Link to="/setups/1">Setup 1</Link>
        </li>
        <li>
          <Link to="/user/1">User 1</Link>
        </li>
        <li>
          <Link to="/profile">Own profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
