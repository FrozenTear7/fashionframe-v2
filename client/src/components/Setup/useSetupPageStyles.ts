import { makeStyles, Theme } from '@material-ui/core/styles';

const useSetupPageStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontSize: '2.5em',
    [theme.breakpoints.up('lg')]: {
      fontSize: '5em',
    },
  },
  subTitle: {
    fontSize: '1em',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.5em',
    },
    maxWidth: 600,
    'word-wrap': 'break-word',
  },
  screenshot: {
    width: '100%',
    height: 'auto',
    minWidth: '40vh',
  },
  screenshotDialog: {
    width: '100%',
    height: 'auto',
    minWidth: '40vh',
    maxWidth: '77vw',
  },
  appBar: {
    marginTop: theme.spacing(3),
  },
}));

export default useSetupPageStyles;
