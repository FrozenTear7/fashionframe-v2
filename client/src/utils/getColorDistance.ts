import { RGB } from '../types';

const getColorDistance = (color1: RGB, color2: RGB): number => {
  return Math.sqrt(
    (color1.r - color2.r) ** 2 +
      (color1.g - color2.g) ** 2 +
      (color1.b - color2.b) ** 2
  );
};

export default getColorDistance;
