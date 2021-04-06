import { Button, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useHomepageStyles from './useHomepageStyles';

const Homepage: React.VFC = () => {
  const classes = useHomepageStyles();

  React.useEffect(() => {
    document.body.className = 'gradient-background';

    return (): void => {
      document.body.className = '';
    };
  }, []);

  return (
    <div className="Homepage test">
      <Helmet>
        <title>Fashionframe</title>
        <meta
          name="description"
          content="Fashionframe is a social hub for Warframe players, where they can share their fashion setups and use those, created by others. These fashion setups include attachments, syandanas, colors and skins for all available frames in the game."
        />
      </Helmet>
      <Container component="main" maxWidth="md">
        <Typography className={classes.title}>Fashionframe</Typography>
        <Typography className={classes.subTitle}>
          The true endgame begins here
        </Typography>
        <Button
          variant="outlined"
          className={classes.exploreButton}
          component={Link}
          to="/setups"
        >
          Explore
        </Button>
      </Container>
    </div>
  );
};

export default Homepage;
