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
  colorSchemeButton: {
    width: 75,
    height: 35,
    border: '1px solid',
  },
  colorSchemeButtonCheckered: {
    width: 75,
    height: 35,
    border: '1px solid',
    'background-image':
      'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
    'background-size': '20px 20px',
    'background-position': '0 0, 0 10px, 10px -10px, -10px 0px',
  },
}));

export default useSetupPageStyles;
