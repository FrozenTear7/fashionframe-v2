/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import ColorSelect from './ColorSelect';

const colors = [
  'primary',
  'secondary',
  'tertiary',
  'accents',
  'emmissive1',
  'emmissive2',
  'energy1',
  'energy2',
];

type SetupSectionProps = {
  dataPrefix: string;
  colorPickers: { [colorPicker: string]: string[] };
};

const ColorSchemeSubsection: React.VFC<SetupSectionProps> = ({
  dataPrefix,
  colorPickers,
}) => {
  return (
    <>
      {colors.map((color) => (
        <ColorSelect
          key={color}
          valueToSet={`${dataPrefix}.${color}`}
          colorPickers={colorPickers}
        />
      ))}
    </>
  );
};

export default ColorSchemeSubsection;
