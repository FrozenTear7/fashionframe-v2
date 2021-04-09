import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { RouteComponentProps } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { Container } from '@material-ui/core';
import { UserDetails } from '../../types/User';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import UserPage from './UserPage';
import { SetupItem } from '../../types/Setup';

const User: React.VFC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId = match.params.id;

  const [{ data: userData, loading: userLoading, error: userError }] = useAxios<
    UserDetails,
    string
  >(`/api/users/${userId}`);
  const [
    { data: userSetups, loading: userSetupsLoading, error: userSetupsError },
  ] = useAxios<SetupItem[], string>(`/api/setups/user/${userId}`);

  if (userLoading || userSetupsLoading) return <Loading />;
  if (userError) return <Error error={userError.message} />;
  if (userSetupsError) return <Error error={userSetupsError.message} />;
  if (!userData || !userSetups) return <Error error="Something went wrong" />;
  return (
    <Container component="main" maxWidth="xl">
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
    </Container>
  );
};

export default User;
