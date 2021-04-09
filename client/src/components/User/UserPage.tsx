import { Container, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import StarIcon from '@material-ui/icons/Star';
import { SetupItem } from '../../types/Setup';
import { UserDetails } from '../../types/User';
import useUserPageStyles from './useUserPageStyles';
import SetupList from '../Setups/SetupList';

interface UserPageProps {
  user: UserDetails;
  userSetups: SetupItem[];
}

const UserPage: React.VFC<UserPageProps> = ({ user, userSetups }) => {
  const classes = useUserPageStyles();
  const { username, totalScore } = user;

  return (
    <Container component="main" maxWidth="xl">
      <Grid container item direction="column" spacing={3}>
        <Grid container item direction="column">
          <Grid item>
            <Typography className={classes.title} component="h1">
              {username}&apos;s profile
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.subtitle} component="p">
              User&apos;s total score: {totalScore} <StarIcon />
            </Typography>
          </Grid>
        </Grid>
        <Grid container item alignItems="center" direction="column">
          <Grid item>
            <Typography className="body1" component="p">
              Setups created by user:
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <SetupList setups={userSetups} />
    </Container>
  );
};

export default UserPage;
