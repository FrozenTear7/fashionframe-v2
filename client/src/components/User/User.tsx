import * as React from 'react';
import { RouteComponentProps } from 'react-router';

const User: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId = match.params.id;

  return <div className="User">User {userId}</div>;
};

export default User;
