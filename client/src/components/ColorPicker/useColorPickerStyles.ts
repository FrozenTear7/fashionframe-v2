import { makeStyles, Theme } from '@material-ui/core/styles';

const buttonWidth = 30;
const gridButtonWidth = 5;
const gridButtonHeight = 18;

const useColorPickerStyles = makeStyles<Theme>((_theme) => ({
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
    cursor: 'pointer',
    '&:hover': {
      border: '2px solid white',
    },
  },
  colorPickerButtonNotSelected: {
    border: 0,
    width: buttonWidth,
    height: buttonWidth,
    outline: 'none',
    cursor: 'pointer',
    '&:hover': {
      border: '2px solid white',
    },
  },
  colorSchemeButton: {
    width: '75px',
    height: '35px',
    border: '1px solid',
  },
  colorSchemeButtonCheckered: {
    width: '75px',
    height: '35px',
    border: '1px solid',
    'background-image':
      'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
    'background-size': '20px 20px',
    'background-position': '0 0, 0 10px, 10px -10px, -10px 0px',
  },
}));

export default useColorPickerStyles;
