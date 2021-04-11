import { RGB } from '../types';

const hexToRGB = (hex: string): RGB => {
  return {
    r: +`0x${hex[1]}${hex[1]}`,
    g: +`0x${hex[2]}${hex[2]}`,
    b: +`0x${hex[3]}${hex[3]}`,
  };
};

export default hexToRGB;
