import * as diff from 'color-diff';
import hexToRgb from './hexToRgb';
import rgbToHex from './rgbToHEx';

const getColorPickerClosestColor = (
  colorPicker: string[],
  colorToMatch: string
): string => {
  return rgbToHex(
    diff.closest(
      hexToRgb(colorToMatch),
      colorPicker.map((color) => hexToRgb(color))
    )
  );
};

export default getColorPickerClosestColor;
