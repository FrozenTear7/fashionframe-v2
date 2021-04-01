import * as React from 'react';
import { GithubPicker } from 'react-color';
import { Controller } from 'react-hook-form';
import { Control, FieldValues } from 'react-hook-form/dist/types';
import { Select, MenuItem } from '@material-ui/core';
import fixColors from '../../utils/fixColors';

type ColorSelectProps = {
  valueToSet: string;
  colorPickers: { [colorPicker: string]: string[] };
  control: Control<FieldValues>;
};

const ColorSelect: React.VFC<ColorSelectProps> = ({
  valueToSet,
  colorPickers,
  control,
}) => {
  const [currentColorPicker] = React.useState<string>('Agony');

  return (
    <>
      <Select
        onChange={(e): void => {
          console.log(e);
        }}
      >
        {Object.keys(colorPickers).map((colorPicker) => (
          <MenuItem value={colorPicker}>{colorPicker}</MenuItem>
        ))}
      </Select>

      <Controller
        control={control}
        name={valueToSet}
        defaultValue={null}
        render={({ onChange, ref }): JSX.Element => (
          <GithubPicker
            ref={ref}
            colors={fixColors(colorPickers[currentColorPicker])} // Terrible solution, but no idea how to override keys
            triangle="hide"
            width="125px"
            onChangeComplete={({ hex }): void => {
              onChange(hex);
            }}
          />
        )}
      />
    </>
  );
};

export default ColorSelect;
