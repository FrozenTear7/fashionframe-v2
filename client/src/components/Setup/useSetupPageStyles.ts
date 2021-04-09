import { makeStyles, Theme } from '@material-ui/core/styles';

const useSetupPageStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontSize: '2.5em',
    [theme.breakpoints.up('lg')]: {
      fontSize: '5em',
    },
  },
  subTitle: {
    fontSize: '1.5em',
    maxWidth: 600,
    'word-wrap': 'break-word',
  },
  screenshot: {
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
    maxHeight: 'calc(30vw * 9/16 + 30vh * 9/16)',
  },
  screenshotDialog: {
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
    maxHeight: 'calc(50vw * 9/16 + 50vh * 9/16)',
    // width: '100%',
    // height: 'auto',
    // minWidth: '40vh',
    // maxWidth: '77vw',
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
  favoriteButtonSuccess: {
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.dark,
    },
  },
  favoriteButtonError: {
    background: theme.palette.error.main,
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
}));

export default useSetupPageStyles;
