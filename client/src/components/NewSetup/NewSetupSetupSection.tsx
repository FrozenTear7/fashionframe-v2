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
  const { register, errors, control, setValue, watch } = methods;
  const { frame: currentFrame } = watch();

  return (
    <>
      <label>Name</label>
      <input name="name" ref={register} />
      <p>{errors.name?.message}</p>

      <label>Description</label>
      <textarea name="description" ref={register} />
      <p>{errors.description?.message}</p>

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
      <p>{errors.frame?.message}</p>

      <label>Helmet</label>
      <SelectField
        optionValuesToMap={helmets[currentFrame]}
        name="helmet"
        withNone={false}
      />
      <p>{errors.helmet?.message}</p>

      <label>Skin</label>
      <SelectField
        optionValuesToMap={skins[currentFrame]}
        name="skin"
        withNone={false}
      />
      <p>{errors.skin?.message}</p>

      <label>Screenshot</label>
      <input
        name="screenshotImage"
        type="file"
        accept="image/*"
        ref={register}
      />
      <p>{(errors.screenshotImage as { message: string })?.message}</p>
    </>
  );
};

export default NewSetupSetupSection;
