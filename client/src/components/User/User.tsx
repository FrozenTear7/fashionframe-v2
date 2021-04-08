import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps } from 'react-router-dom';
import useAxiosGet from '../../requests/useAxiosGet';
import { GetRequestGeneric } from '../../types';
import { UserDetails } from '../../types/User';

interface AxiosGetUser extends GetRequestGeneric {
  data: UserDetails;
}

const User: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId = match.params.id;

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  }: AxiosGetUser = useAxiosGet(`/api/users/${userId}`);

  console.log(userData);

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
