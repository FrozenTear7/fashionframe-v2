/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { Control, FieldValues } from 'react-hook-form/dist/types';
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
  control: Control<FieldValues>;
};

const ColorSchemeSubsection: React.VFC<SetupSectionProps> = ({
  dataPrefix,
  colorPickers,
  control,
}) => {
  return (
    <>
      {colors.map((color) => (
        <ColorSelect
          key={color}
          valueToSet={`${dataPrefix}.${color}`}
          colorPickers={colorPickers}
          control={control}
        />
      ))}
    </>
  );
};

export default ColorSchemeSubsection;
