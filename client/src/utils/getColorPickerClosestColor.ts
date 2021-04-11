import getColorDistance from './getColorDistance';
import hexToRgb from './hexToRgb';

const getColorPickerClosestColor = (
  colorPicker: string[],
  colorToMatch: string
): string => {
  // Deep copy JS stuff we don't want to mutate the original array
  return [...colorPicker].sort(
    (a, b) =>
      getColorDistance(hexToRgb(a), hexToRgb(colorToMatch)) -
      getColorDistance(hexToRgb(b), hexToRgb(colorToMatch))
  )[0];
};

export default getColorPickerClosestColor;
