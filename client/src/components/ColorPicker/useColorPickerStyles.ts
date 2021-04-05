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
}));

export default useColorPickerStyles;
