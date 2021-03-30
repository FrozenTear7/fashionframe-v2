import * as React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../UserContext';

const Header: React.VFC = () => {
  const { user } = useUserContext();
  console.log(user);

  return (
    <div className="Header">
      HEADER - User: {user?.username}
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
        <li>
          <Link to="/setups">Setups</Link>
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
