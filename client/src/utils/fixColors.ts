type RGB = { r: number; g: number; b: number };

const rgbToHex = (rgb: RGB): string => {
  const { r, g, b } = rgb;

  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const hexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const fixColors = (colors: string[]): string[] => {
  let fixedColors: string[] = [];

  colors.forEach((color) => {
    let fixedColor = color;

    if (fixedColors.includes(color)) {
      let rgbFixedColor = hexToRgb(fixedColor);

      if (rgbFixedColor) {
        if (
          !fixedColors.includes(
            rgbToHex({ ...rgbFixedColor, r: rgbFixedColor.r + 1 })
          ) &&
          rgbFixedColor.r + 1 <= 255
        )
          rgbFixedColor = { ...rgbFixedColor, r: rgbFixedColor.r + 1 };
        else if (
          !fixedColors.includes(
            rgbToHex({ ...rgbFixedColor, g: rgbFixedColor.g + 1 })
          ) &&
          rgbFixedColor.g + 1 <= 255
        )
          rgbFixedColor = { ...rgbFixedColor, g: rgbFixedColor.g + 1 };
        else if (
          !fixedColors.includes(
            rgbToHex({ ...rgbFixedColor, b: rgbFixedColor.b + 1 })
          ) &&
          rgbFixedColor.b + 1 <= 255
        )
          rgbFixedColor = { ...rgbFixedColor, b: rgbFixedColor.b + 1 };
        else if (
          !fixedColors.includes(
            rgbToHex({ ...rgbFixedColor, r: rgbFixedColor.r - 1 })
          ) &&
          rgbFixedColor.r - 1 >= 0
        )
          rgbFixedColor = { ...rgbFixedColor, r: rgbFixedColor.r - 1 };
        else if (
          !fixedColors.includes(
            rgbToHex({ ...rgbFixedColor, g: rgbFixedColor.g - 1 })
          ) &&
          rgbFixedColor.g - 1 >= 0
        )
          rgbFixedColor = { ...rgbFixedColor, g: rgbFixedColor.g - 1 };
        else if (
          !fixedColors.includes(
            rgbToHex({ ...rgbFixedColor, b: rgbFixedColor.b - 1 })
          ) &&
          rgbFixedColor.b - 1 >= 0
        )
          rgbFixedColor = { ...rgbFixedColor, b: rgbFixedColor.b - 1 };
      }

      if (rgbFixedColor) fixedColor = rgbToHex(rgbFixedColor);
    }
    fixedColors = [...fixedColors, fixedColor];
  });

  return fixedColors;
};

export default fixColors;
