/* eslint-disable no-bitwise */
import * as diff from 'color-diff';

const rgbToHex = (color: diff.RGBColor): string => {
  return `#${((1 << 24) + (color.R << 16) + (color.G << 8) + color.B)
    .toString(16)
    .slice(1)}`;
};

export default rgbToHex;
