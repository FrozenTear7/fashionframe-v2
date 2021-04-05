import { makeStyles, Theme } from '@material-ui/core/styles';

const useHomepageStyles = makeStyles<Theme>((theme) => ({
  title: {
    marginTop: theme.spacing(4),
    fontSize: '3em',
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12),
      fontSize: '8em',
    },
  },
  subTitle: {
    marginLeft: theme.spacing(4),
    fontSize: '2em',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(8),
      fontSize: '4em',
    },
  },
  exploreButton: {
    color: 'white',
    margin: theme.spacing(3),
    fontSize: '1.5em',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(12),
      fontSize: '2em',
    },
  },
}));

export default useHomepageStyles;
