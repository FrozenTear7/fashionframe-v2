/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { Control, FieldValues } from 'react-hook-form/dist/types';
import { WarframeData } from '../../types/WarframeData';
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
  warframeData: WarframeData;
  control: Control<FieldValues>;
};

const ColorSchemeSubsection: React.VFC<SetupSectionProps> = ({
  dataPrefix,
  warframeData,
  control,
}) => {
  return (
    <>
      {colors.map((color) => (
        <ColorSelect
          key={color}
          valueToSet={`${dataPrefix}.${color}`}
          warframeData={warframeData}
          control={control}
        />
      ))}
    </>
  );
};

export default ColorSchemeSubsection;
