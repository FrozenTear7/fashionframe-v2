import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps } from 'react-router-dom';
import useAxiosGet from '../../requests/useAxiosGet';
import { GetRequestGeneric } from '../../types';
import { UserDetails } from '../../types/User';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import UserPage from './UserPage';
import { SetupItem } from '../../types/Setup';

interface AxiosGetUser extends GetRequestGeneric {
  data: UserDetails;
}

interface AxiosGetSetups extends GetRequestGeneric {
  data: SetupItem[];
}

const User: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId = match.params.id;

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  }: AxiosGetUser = useAxiosGet(`/api/users/${userId}`);

  const {
    data: userSetups,
    loading: userSetupsLoading,
    error: userSetupsError,
  }: AxiosGetSetups = useAxiosGet(`/api/setups/user/${userId}`);

  console.log(userData);
  console.log(userSetups);

  if (userLoading || userSetupsLoading) return <Loading />;
  if (userError) return <Error error={userError} />;
  if (userSetupsError) return <Error error={userSetupsError} />;
  return (
    <div className="User">
      <Helmet>
        <title>{userData.username} | Users | Fashionframe</title>
        <meta
          name="description"
          content={`Check out fashion setups by user ${String(
            userData.username
          )}`}
        />
      </Helmet>
      <UserPage user={userData} userSetups={userSetups} />
    </div>
  );
};

export default User;
