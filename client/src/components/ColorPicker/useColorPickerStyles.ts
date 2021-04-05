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
  colorPickerButton: {
    border: 0,
    width: buttonWidth,
    height: buttonWidth,
    outline: 'none',
  },
}));

export default useColorPickerStyles;
