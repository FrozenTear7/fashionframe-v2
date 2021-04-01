import * as React from 'react';
import { GithubPicker } from 'react-color';
import { Controller } from 'react-hook-form';
import { Control, FieldValues } from 'react-hook-form/dist/types';
import Select from 'react-select';
import { WarframeData } from '../../types/WarframeData';
import fixColors from '../../utils/fixColors';

type ColorSelectProps = {
  valueToSet: string;
  warframeData: WarframeData;
  control: Control<FieldValues>;
};

const ColorSelect: React.VFC<ColorSelectProps> = ({
  valueToSet,
  warframeData,
  control,
}) => {
  const [currentColorPicker, setCurrentColorPicker] = React.useState<string>(
    'Agony'
  );

  const options = Object.keys(warframeData.colorPickers).map((colorPicker) => {
    return {
      value: colorPicker,
      label: colorPicker,
    };
  });

  return (
    <>
      <Select
        options={options}
        onChange={(value): void => {
          if (value) setCurrentColorPicker(value.value);
        }}
      />

      <Controller
        control={control}
        name={valueToSet}
        defaultValue={null}
        render={({ onChange, ref }): JSX.Element => (
          <GithubPicker
            ref={ref}
            colors={fixColors(warframeData.colorPickers[currentColorPicker])} // Terrible solution, but no idea how to override keys
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
