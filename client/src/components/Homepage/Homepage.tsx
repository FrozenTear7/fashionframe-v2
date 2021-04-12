/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Container, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useHomepageStyles from './useHomepageStyles';

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
        <meta
          name="keywords"
          content="fashionframe, warframe, fashion, homepage, start, visual, video, social, hub, sharing"
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
          <source src="FashionframeHomepage.mp4#t=0.1" type="video/mp4" />
        </video>
        <Container component="main" maxWidth="xl">
          <Grid container>
            <Grid
              container
              item
              className={classes.mainContainer}
              direction="column"
              alignItems="center"
            >
              <Grid item>
                <Typography className={classes.title}>Fashionframe</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.subTitle}>
                  The true endgame begins here
                </Typography>
              </Grid>
              <Grid item>
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
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Homepage;
