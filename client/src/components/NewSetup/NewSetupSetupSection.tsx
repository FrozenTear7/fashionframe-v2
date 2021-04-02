/* eslint-disable @typescript-eslint/unbound-method */
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, MenuItem } from '@material-ui/core';
import SelectField from '../Utils/SelectField';

type SetupSectionProps = {
  frames: string[];
  helmets: { [frame: string]: string[] };
  skins: { [frame: string]: string[] };
};

const NewSetupSetupSection: React.VFC<SetupSectionProps> = ({
  frames,
  helmets,
  skins,
}) => {
  const methods = useFormContext();
  const { errors, control, setValue, watch } = methods;
  const { frame: currentFrame } = watch();

  return (
    <>
      <label>Frame</label>
      <Controller
        name="frame"
        control={control}
        render={({ onChange, value }): JSX.Element => (
          <Select
            value={value}
            onChange={(e): void => {
              onChange(e.target.value);
              setValue('helmet', `${String(e.target.value)} Helmet`);
              setValue('skin', `${String(e.target.value)} Skin`);
            }}
          >
            {frames.map((frame) => (
              <MenuItem key={frame} value={frame}>
                {frame}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <>{errors.frame?.message}</>

      <label>Helmet</label>
      <SelectField
        optionValuesToMap={helmets[currentFrame]}
        name="helmet"
        withNone={false}
      />
      <>{errors.helmet?.message}</>

      <label>Skin</label>
      <SelectField
        optionValuesToMap={skins[currentFrame]}
        name="skin"
        withNone={false}
      />
      <>{errors.skin?.message}</>
    </>
  );
};

export default NewSetupSetupSection;
