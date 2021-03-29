import * as React from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router';

const User: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId = match.params.id;

  return (
    <div className="User">
      <Helmet>
        <title>USERNAME | Users | Fashionframe</title>
        <meta name="description" content="Fashion setups by user USERNAME" />
      </Helmet>
      User {userId}
    </div>
  );
};

export default User;
