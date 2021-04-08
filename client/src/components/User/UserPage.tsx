import { Container, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import StarIcon from '@material-ui/icons/Star';
import { SetupItem } from '../../types/Setup';
import { UserDetails } from '../../types/User';
import useUserPageStyles from './useUserPageStyles';

interface UserPageProps {
  user: UserDetails;
  userSetups: SetupItem[];
}

const UserPage: React.VFC<UserPageProps> = ({ user, userSetups }) => {
  const classes = useUserPageStyles();
  const { username, totalScore } = user;

  return (
    <Container component="main" maxWidth="xl">
      <Grid container item>
        <Grid item>
          <Typography className={classes.title} component="h1">
            {username}&apos;s profile
          </Typography>
          <Typography className={classes.subtitle} component="p">
            User&apos;s total score: {totalScore} <StarIcon />
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
