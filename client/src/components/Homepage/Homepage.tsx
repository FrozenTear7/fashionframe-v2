/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Container, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useHomepageStyles from './useHomepageStyles';
import '../../homepage.css';

const Homepage: React.VFC = () => {
  const classes = useHomepageStyles();

  return (
    <>
      <Helmet>
        <title>Fashionframe</title>
        <meta
          name="description"
          content="Fashionframe is a social hub for Warframe players, where they can share their fashion setups and use those, created by others. These fashion setups include attachments, syandanas, colors and skins for all available frames in the game."
        />
      </Helmet>
      <div className={classes.videoContainer}>
        <video
          className={classes.backgroundVideo}
          autoPlay
          loop
          muted
          preload="auto"
        >
          <source src="FashionframeHomepage.mp4" type="video/mp4" />
        </video>
        <Container component="main" maxWidth="xl">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.mainContainer}>
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
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Homepage;
