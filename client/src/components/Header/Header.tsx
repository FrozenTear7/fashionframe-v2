import * as React from 'react';
import { Link } from 'react-router-dom';

const Header: React.VFC = () => {
  return (
    <div className="Header">
      HEADER
      <ul>
        <li>
          <Link to="/">Homepage</Link>
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
