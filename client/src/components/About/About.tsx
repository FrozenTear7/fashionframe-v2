import { Container, Divider, Link, Typography } from '@material-ui/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import useAboutStyles from './useAboutStyles';

const About: React.VFC = () => {
  const classes = useAboutStyles();

  return (
    <>
      <Helmet>
        <title>About | Fashionframe</title>
        <meta
          name="description"
          content="Learn more about Fashionframe, how it was made and how you can contribute to the project."
        />
        <meta
          name="keywords"
          content="fashionframe, warframe, fashion, about, social, hub, sharing"
        />
      </Helmet>
      <Container component="main" maxWidth="md">
        <Typography className={classes.title} component="h1">
          Fashionframe
        </Typography>
        <Typography className={classes.subTitle} component="p">
          Social hub for sharing Warframe fashion setups
        </Typography>
        <Divider className={classes.titleDivider} />
        <Typography variant="h5" component="p">
          About the app
        </Typography>
        <Typography variant="h6" component="p">
          The project is{' '}
          <Link
            href="https://github.com/FrozenTear7/fashionframe-v2/blob/master/LICENSE"
            target="_blank"
            rel="noopener"
          >
            open-source
          </Link>
          , the repository is publicly available{' '}
          <Link
            href="https://github.com/FrozenTear7/fashionframe-v2"
            target="_blank"
            rel="noopener"
          >
            here
          </Link>
          . I&apos;m currently using a free tier of MongoDB hosting on{' '}
          <Link
            href="https://www.mongodb.com/cloud/atlas"
            target="_blank"
            rel="noopener"
          >
            Atlas
          </Link>{' '}
          and the app itself is hosted on a free tier on{' '}
          <Link href="https://www.heroku.com" target="_blank" rel="noopener">
            Heroku
          </Link>
          . If the project gathers some attention, this state might change in
          the future, when more resources is needed to support the site.
          <br />
          The RESTful API is serving Warframe data (such as available frames,
          skins, helmets, attachments) on endpoints as documented in{' '}
          <Link
            href="https://github.com/FrozenTear7/fashionframe/blob/master/README.md"
            target="_blank"
            rel="noopener"
          >
            README
          </Link>
          .
        </Typography>
        <Divider className={classes.titleDivider} />
        <Typography variant="h5" component="p">
          Would you like to contribute?
        </Typography>
        <Typography variant="h6" component="p">
          If you&apos;d like to see a new feature added, feel free to suggest it
          via{' '}
          <Link
            href="https://github.com/FrozenTear7/fashionframe-v2/issues"
            target="_blank"
            rel="noopener"
          >
            Issues
          </Link>{' '}
          on Github or submit a{' '}
          <Link
            href="https://github.com/FrozenTear7/fashionframe-v2/pulls"
            target="_blank"
            rel="noopener"
          >
            Pull Request
          </Link>{' '}
          if you want to directly work on existing issues or implement features.
        </Typography>
        <Divider className={classes.titleDivider} />
        <Typography variant="body1" component="p">
          Created and maintained by{' '}
          <Link
            href="https://github.com/FrozenTear7"
            target="_blank"
            rel="noopener"
          >
            FrozenTear7
          </Link>
          . If you enjoy Fashionframe, consider giving this project a star on
          Github, it means a lot. <br /> For any Warframe related topics feel
          free to contact me in-game @FrozenTear7 - I&apos;m a 30MR true master
          god gamer ready to help you.
        </Typography>
        <Divider className={classes.titleDivider} />
        <Typography variant="body2" component="p">
          Fashionframe isn’t endorsed by Digital Extremes and doesn’t reflect
          the views or opinions of Digital Extremes or anyone officially
          involved in producing or managing Warframe. Warframe and Digital
          Extremes are trademarks or registered trademarks of Digital Extremes
          ©.
        </Typography>
      </Container>
    </>
  );
};

export default About;
