/* eslint-disable import/prefer-default-export */
export const isString = (arg: unknown): arg is string => {
  return typeof arg === 'string' || arg instanceof String;
};

export const isObject = (arg: unknown): boolean => {
  return arg != null && (typeof arg === 'object' || typeof arg === 'function');
};
