import * as diff from 'color-diff';

const hexToRGB = (hex: string): diff.RGBColor => {
  return {
    R: +`0x${hex[1]}${hex[2]}`,
    G: +`0x${hex[3]}${hex[4]}`,
    B: +`0x${hex[5]}${hex[6]}`,
  };
};

export default hexToRGB;
