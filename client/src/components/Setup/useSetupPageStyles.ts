import { makeStyles, Theme } from '@material-ui/core/styles';

const buttonWidth = 30;
const gridButtonWidth = 5;
const gridButtonHeight = 18;

const useSetupPageStyles = makeStyles<Theme>((theme) => ({
  title: {
    fontSize: '2.5em',
    [theme.breakpoints.up('lg')]: {
      fontSize: '5em',
    },
    maxWidth: 600,
    'word-wrap': 'break-word',
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
    minWidth: 150,
    minHeight: 150,
  },
  screenshotDialog: {
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
    maxHeight: 'calc(50vw * 9/16 + 50vh * 9/16)',
    minWidth: 150,
    minHeight: 150,
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
  colorPickerGrid: {
    width: buttonWidth * gridButtonWidth,
    gridButtonHeight: buttonWidth * gridButtonHeight,
    margin: 0,
    padding: 0,
  },
  colorPickerGridItem: {
    width: buttonWidth,
    height: buttonWidth,
  },
  colorPickerButtonSelected: {
    border: '2px solid white',
    width: buttonWidth,
    height: buttonWidth,
    outline: 'none',
  },
  colorPickerButtonNotSelected: {
    border: 0,
    width: buttonWidth,
    height: buttonWidth,
    outline: 'none',
  },
}));

export default useSetupPageStyles;
